import {Formik} from 'formik';
import Container from '../../../components/container/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import CustomInput from '../../../components/customInput/Index';

const VerifyAddress = () => {
  return (
    <Container flex={1}>
      <ScreenHeader
        title="Verify residential address"
        description="This address will be physically verified"
      />

      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Container width={'full'} gap={10}>
            <CustomInput
              label="House address"
              placeholder="e.g 45 Odunlade street, Bariga"
            />

            <Container width={'full'} flexDirection="row" gap={30}>
              <CustomInput
                label="State"
                placeholder="e.g 45 Odunlade street, Bariga"
              />
              <CustomInput
                label="House address"
                placeholder="e.g 45 Odunlade street, Bariga"
              />
            </Container>
          </Container>
        )}
      </Formik>
    </Container>
  );
};
export default VerifyAddress;
