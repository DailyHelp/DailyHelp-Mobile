import {City, State} from 'country-state-city';
import React, {useReducer} from 'react';
import {ActionSheetRef, SheetManager} from 'react-native-actions-sheet';
import {IVerifyAddress} from '../../../@types/routes';
import Gallery from '../../../components/Gallery';
import ScreenHeader from '../../../components/ScreenHeader';
import UploadContainer from '../../../components/UploadContainer';
import MainButton from '../../../components/button/MainButton';
import Container from '../../../components/container/Index';
import CustomInput from '../../../components/customInput/Index';
import utils from '../../../shared/Utils';
import {SaveLocationDto} from '../../app/user/home/dto/savedLocationDto';
import homeService from '../../app/user/home/services/Home.service';
import {TouchableOpacity} from 'react-native';

// Form state interface
interface FormState {
  values: SaveLocationDto;
  errors: Record<string, string>;
  isSubmitting: boolean;
  touched: Record<string, boolean>;
}

// Form action types
type FormAction =
  | {type: 'SET_FIELD'; field: string; value: string | number | boolean}
  | {type: 'SET_ERROR'; field: string; error: string}
  | {type: 'CLEAR_ERROR'; field: string}
  | {type: 'SET_TOUCHED'; field: string}
  | {type: 'SET_SUBMITTING'; isSubmitting: boolean}
  | {type: 'RESET_FORM'};

// Form reducer
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: '', // Clear error when field is updated
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
    case 'RESET_FORM':
      return {
        values: new SaveLocationDto(),
        errors: {},
        isSubmitting: false,
        touched: {},
      };
    default:
      return state;
  }
};

const VerifyAddress: IVerifyAddress = ({navigation}) => {
  const {onSubmit} = homeService.useLocation();
  const {onSubmit: onUpload, uploading} = homeService.useUpload();

  utils.useHideBottomTab({navigation});

  const galleryBottomSheetRef = React.useRef<ActionSheetRef | null>(null);

  const states = State.getStatesOfCountry('NG');

  // Form state and dispatch
  const [formState, dispatch] = useReducer(formReducer, {
    values: new SaveLocationDto(),
    errors: {},
    isSubmitting: false,
    touched: {},
  });

  // Validation function
  const validateField = (field: string, value: any): string => {
    switch (field) {
      case 'address':
        if (!value || value.toString().trim() === '') {
          return 'Address is required';
        }
        break;
      case 'state':
        if (!value || value.toString().trim() === '') {
          return 'State is required';
        }
        break;
      case 'lga':
        if (!value || value.toString().trim() === '') {
          return 'LGA is required';
        }
        break;
      case 'utilityBill':
        if (!value || value.toString().trim() === '') {
          return 'Utility bill is required';
        }
        break;
    }
    return '';
  };

  // Handle field change
  const handleFieldChange = (field: string, value: any) => {
    dispatch({type: 'SET_FIELD', field, value});

    // Validate field if it has been touched
    if (formState.touched[field]) {
      const error = validateField(field, value);
      if (error) {
        dispatch({type: 'SET_ERROR', field, error});
      } else {
        dispatch({type: 'CLEAR_ERROR', field});
      }
    }
  };

  // Handle field blur
  const handleFieldBlur = (field: string) => {
    dispatch({type: 'SET_TOUCHED', field});

    const error = validateField(
      field,
      formState.values[field as keyof SaveLocationDto],
    );
    if (error) {
      dispatch({type: 'SET_ERROR', field, error});
    } else {
      dispatch({type: 'CLEAR_ERROR', field});
    }
  };

  const handleSubmit = async () => {
    Object.keys(formState.values).forEach(field => {
      dispatch({type: 'SET_TOUCHED', field});
    });

    let hasErrors = false;
    Object.entries(formState.values).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) {
        dispatch({type: 'SET_ERROR', field, error});
        hasErrors = true;
      }
    });

    if (hasErrors) {
      return;
    }

    dispatch({type: 'SET_SUBMITTING', isSubmitting: true});

    try {
      await onSubmit(formState.values, () => {
        dispatch({type: 'SET_SUBMITTING', isSubmitting: false});
        navigation.navigate('ProfileSetup');
      });
    } catch (error) {
      console.error('Form submission error:', error);
      dispatch({type: 'SET_SUBMITTING', isSubmitting: false});
      dispatch({
        type: 'SET_ERROR',
        field: 'address',
        error: 'Failed to save address. Please try again.',
      });
    }
  };

  return (
    <Container flex={1} gap={20} padding={16}>
      <ScreenHeader
        title="Verify residential address"
        description="This address will be physically verified"
      />

      <Container width={'full'} gap={20}>
        <CustomInput
          type="address"
          label="House address"
          placeholder="e.g 45 Odunlade street, Bariga"
          disabled
          onAddressSelect={data => {
            try {
              if (data) {
                if (data.address) {
                  handleFieldChange('address', data.address);
                }
                if (data.lat) handleFieldChange('lat', data.lat);
                if (data.lng) handleFieldChange('lng', data.lng);
              }
            } catch (error) {
              console.error('Error in onClose callback:', error);
            }
          }}
          value={formState.values.address}
          error={formState.touched.address ? formState.errors.address : ''}
        />

        <Container
          width={'full'}
          flexDirection="row"
          justifyContent="space-between">
          <CustomInput
            type="select"
            label="State"
            placeholder="Select state"
            value={formState.values.state}
            error={formState.touched.state ? formState.errors.state : ''}
            width={150}
            options={states?.map(({name, ...data}) => ({
              label: name!,
              value: name,
              data,
            }))}
            onSelect={data => {
              handleFieldChange('stateCode', data?.data.data?.isoCode);
              handleFieldChange('state', data.value);
            }}
            onBlur={() => handleFieldBlur('state')}
          />
          <CustomInput
            type="select"
            label="LGA"
            placeholder="Select LGA"
            value={formState.values.lga}
            error={formState.touched.lga ? formState.errors.lga : ''}
            width={150}
            options={City.getCitiesOfState(
              'NG',
              formState.values.stateCode!,
            )?.map(({name, ...data}) => ({
              label: name!,
              value: name,
              data,
            }))}
            onSelect={data => handleFieldChange('lga', data?.value || '')}
            onBlur={() => handleFieldBlur('lga')}
          />
        </Container>

        <CustomInput
          type="text"
          multiline
          numberOfLines={5}
          label="Direction"
          height={200}
          value={formState.values.description}
          onChangeText={text => handleFieldChange('description', text)}
          onBlur={() => handleFieldBlur('description')}
          placeholder="Give clear directions from the nearest bus stop. Include the house type, color, gate color, and any other helpful details to find your location easily."
        />

        <UploadContainer
          status="upload"
          uri={formState.values.utilityBill}
          title="Attach Utility Bill"
          description="Include photo of Electricity bill showing your address"
          upload={() => galleryBottomSheetRef.current?.show()}
          isUploading={uploading}
        />

        <MainButton
          onPress={handleSubmit}
          marginTop={30}
          loading={formState.isSubmitting}>
          Submit Address
        </MainButton>
      </Container>

      <Gallery
        ref={galleryBottomSheetRef}
        maxSelect={1}
        close={() => galleryBottomSheetRef.current?.hide()}
        selectImages={async images => {
          if (images) {
            try {
              const imageUri = Array.isArray(images) ? images[0] : images;

              const result = await onUpload(imageUri);

              const imageUrl =
                (result as any)?._j || (result as any)?.url || result;

              handleFieldChange('utilityBill', imageUrl);
            } catch (error) {
              console.error('Upload error:', error);
            }
          }
        }}
      />
    </Container>
  );
};
export default VerifyAddress;
