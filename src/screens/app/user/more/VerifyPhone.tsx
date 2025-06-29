import {Formik} from 'formik';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomInput from '../../../../components/customInput/Index';
import ScreenHeader from '../../../../components/ScreenHeader';
import {IVerifyPhone} from '../../../../@types/routes';
import utils from '../../../../shared/Utils';

const VerifyPhone: IVerifyPhone = ({navigation}) => {
  utils.useHideBottomTab(navigation);
  return (
    <Container
      height={650}
      flex={1}
      paddingTop={10}
      justifyContent="space-between">
      <Container width={'full'} gap={30}>
        <ScreenHeader
          title="Verify Phone number"
          description="Enter your phone number, and a verification code will be sent to verify it."
        />

        <Formik initialValues={{}} onSubmit={() => {}}>
          {({}) => <CustomInput type="phone" label="Phone number" />}
        </Formik>
      </Container>

      <MainButton>Send code</MainButton>
    </Container>
  );
};

export default VerifyPhone;
