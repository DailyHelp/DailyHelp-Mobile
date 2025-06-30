import {Formik} from 'formik';
import Container from '../../../components/container/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import CustomInput from '../../../components/customInput/Index';
import {IVerifyAddress} from '../../../@types/routes';
import UploadContainer from '../../../components/UploadContainer';
import MainButton from '../../../components/button/MainButton';

const VerifyAddress: IVerifyAddress = ({navigation}) => {
  return (
    <Container flex={1} gap={20} paddingTop={16}>
      <ScreenHeader
        title="Verify residential address"
        description="This address will be physically verified"
      />

      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Container width={'full'} gap={20}>
            <CustomInput
              label="House address"
              placeholder="e.g 45 Odunlade street, Bariga"
            />

            <Container
              width={'full'}
              flexDirection="row"
              justifyContent="space-between">
              <CustomInput
                type="select"
                label="State"
                placeholder="Select state"
                width={150}
              />
              <CustomInput
                type="select"
                label="LGA"
                placeholder="Select LGA"
                width={150}
              />
            </Container>

            <CustomInput
              type="text"
              multiline
              numberOfLines={5}
              label="Direction"
              height={200}
              placeholder="Give clear directions from the nearest bus stop. Include the house type, color, gate color, and any other helpful details to find your location easily."
            />

            <UploadContainer
              status="failed"
              title="Attach Utility Bill"
              description="Include photo of Electricity bill showing your address"
            />

            <MainButton
              onPress={() => navigation.navigate('ProfileSetup')}
              marginTop={30}>
              Submit Address
            </MainButton>
          </Container>
        )}
      </Formik>
    </Container>
  );
};
export default VerifyAddress;
