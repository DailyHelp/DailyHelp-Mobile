import {Formik} from 'formik';
import React from 'react';
import {ISetPrices} from '../../../@types/routes';
import MainButton from '../../../components/button/MainButton';
import Container from '../../../components/container/Index';
import CustomInput from '../../../components/customInput/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import Typography from '../../../components/Typography';
import homeService from '../../app/user/home/services/Home.service';
import SavePriceDTO from '../../app/user/home/dto/SavePriceDto';
import createValidator from 'class-validator-formik';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../../shared/stores/appStore';
import {UserTypes} from '../../../shared/Constant';
import utils from '../../../shared/Utils';
import {Platform} from 'react-native';

const SetPrices: ISetPrices = ({navigation}) => {
  utils.useHideBottomTab({navigation});
  const {savePrice, isPending} = homeService.useSavePrice();

  return (
    <Container
      padding={10}
      flex={1}
      gap={20}
      backgroundColor="white"
      isKeyboardAvoidingView
      behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
      <ScreenHeader
        title="Set Your Prices"
        description="Let clients know what you charge. Be fair and realistic, you can always negotiate later."
      />

      <Formik
        initialValues={new SavePriceDTO()}
        validate={createValidator(SavePriceDTO)}
        onSubmit={data => {
          savePrice(
            {
              minimumOfferPrice: +data.minimumOfferPrice,
              offerStartingPrice: +data.offerStartingPrice,
            },
            {
              onSuccess: () => {
                appStore.setIsAuthenticated(true, UserTypes.PROVIDER);
              },
            },
          );
        }}>
        {({values, handleChange, handleSubmit, errors}) => (
          <Container width={'full'} height={600} justifyContent="space-between">
            <Container width={'full'} gap={30}>
              <Container width={'full'} gap={3}>
                <CustomInput
                  label="Starting price"
                  placeholder="₦ 5,000"
                  value={values.offerStartingPrice?.toString() || '0'}
                  onChangeText={handleChange('offerStartingPrice')}
                  error={errors.offerStartingPrice}
                />

                <Typography color="gray" size="sm">
                  This is your starting rate for all offers.
                </Typography>
              </Container>

              <Container width={'full'} gap={3}>
                <CustomInput
                  label="Minimum Acceptable Offer"
                  placeholder="₦ 0.00"
                  value={values.minimumOfferPrice?.toString() || '0'}
                  onChangeText={handleChange('minimumOfferPrice')}
                  error={errors.minimumOfferPrice}
                />
                <Typography color="gray" size="sm">
                  This is the lowest amount you can accept for a job.
                </Typography>
              </Container>
            </Container>

            <MainButton loading={isPending} onPress={handleSubmit}>
              Save
            </MainButton>
          </Container>
        )}
      </Formik>
    </Container>
  );
};
export default observer(SetPrices);
