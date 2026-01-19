import {Formik} from 'formik';
import {IUpdatePrices} from '../../../../@types/routes';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import homeService from '../../user/home/services/Home.service';
import utils from '../../../../shared/Utils';

const UpdatePrices: IUpdatePrices = ({navigation, route}) => {
  utils.useHideBottomTab({navigation});
  const {savePrice, isPending} = homeService.useSavePrice();

  return (
    <Formik
      initialValues={{
        offerStartingPrice: route.params?.offerStartingPrice || 0,
        minimumOfferPrice: route.params?.minimumOfferPrice || 0,
      }}
      onSubmit={({offerStartingPrice, minimumOfferPrice}) => {
        savePrice({
          offerStartingPrice: +offerStartingPrice,
          minimumOfferPrice: +minimumOfferPrice,
        });
      }}>
      {({values, errors, handleChange, handleSubmit}) => (
        <Container
          flex={1}
          justifyContent="space-between"
          backgroundColor="white"
          padding={15}>
          <Container gap={20}>
            <Container gap={3}>
              <CustomInput
                keyboardType="number-pad"
                value={values.offerStartingPrice.toString()}
                label="Starting price"
                onChangeText={handleChange('offerStartingPrice')}
                error={errors.offerStartingPrice}
                type="text"
                maskType="amount"
                mask
              />
              <Typography color="gray">
                This is your starting rate for all offers.
              </Typography>
            </Container>
            <Container gap={3}>
              <CustomInput
                value={values.minimumOfferPrice.toString()}
                label="Minimum Acceptable Offer"
                onChangeText={handleChange('minimumOfferPrice')}
                error={errors.minimumOfferPrice}
                type="text"
                maskType="amount"
                mask
                keyboardType="decimal-pad"
              />
              <Typography color="gray">
                This is the lowest amount you can accept for a job.
              </Typography>
            </Container>
          </Container>

          <MainButton
            loading={isPending}
            onPress={handleSubmit}
            enableButtonColor="secondary"
            color="white">
            Save prices
          </MainButton>
        </Container>
      )}
    </Formik>
  );
};
export default UpdatePrices;
