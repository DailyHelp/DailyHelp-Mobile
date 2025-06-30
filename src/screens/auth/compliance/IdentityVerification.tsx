import {createValidator} from 'class-validator-formik';
import {Formik} from 'formik';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {IIdentityVerification} from '../../../@types/routes';
import MainButton from '../../../components/button/MainButton';
import Container from '../../../components/container/Index';
import CustomInput from '../../../components/customInput/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import {verticalScale} from '../../../shared/Scaling';
import utils from '../../../shared/Utils';
import {NationalityDetailsDTO} from '../dto/VerifyIdentityDto';

const IdentityVerification: IIdentityVerification = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);

  return (
    <Container
      type="scroll"
      backgroundColor="white"
      width={'95'}
      flex={1}
      justifyContent="space-between"
      gap={30}
      paddingTop={10}>
      <ScreenHeader
        title="Identity Verification"
        description="We use NIN and BVN together to confirm who you are and comply with
              regulatory requirements."
      />
      <Formik
        initialValues={new NationalityDetailsDTO()}
        onSubmit={data =>
          navigation.navigate('FacialVerification', {
            ...data,
            ...route.params,
          })
        }
        validateOnChange={false}
        validateOnBlur={false}
        validate={createValidator(NationalityDetailsDTO)}>
        {({values, errors, handleChange, handleSubmit}) => (
          <View
            style={{
              height: verticalScale(550),
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column', gap: 10}}>
              <CustomInput
                placeholder="Enter your NIN"
                label="National Identification Number"
                value={values.nin}
                error={errors.nin}
                onChangeText={handleChange('nin')}
                maxLength={11}
                keyboardType="numeric"
              />

              <CustomInput
                placeholder="Enter your BVN"
                label="Bank Verification Number"
                value={values.bvn}
                error={errors.bvn}
                onChangeText={handleChange('bvn')}
                maxLength={11}
                keyboardType="numeric"
              />
            </View>

            <MainButton
              icon={() => <Icon name="arrow-right-l" color={'#014C2B'} />}
              moveIconRight
              onPress={handleSubmit}>
              Next
            </MainButton>
          </View>
        )}
      </Formik>
    </Container>
  );
};
export default IdentityVerification;
