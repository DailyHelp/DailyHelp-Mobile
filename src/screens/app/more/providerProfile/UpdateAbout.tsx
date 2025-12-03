import {Formik} from 'formik';
import {IUpdateAbout} from '../../../../@types/routes';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomInput from '../../../../components/customInput/Index';
import utils from '../../../../shared/Utils';
import homeService from '../../user/home/services/Home.service';

const UpdateAbout: IUpdateAbout = ({route, navigation}) => {
  utils.useHideBottomTab(navigation);
  const {saveHelpersDetails} = homeService.useSaveHelpersDetails();

  return (
    <Formik
      initialValues={{about: route.params?.about}}
      onSubmit={({about}) => saveHelpersDetails({serviceDescription: about!})}>
      {({values, errors, handleChange, handleSubmit}) => (
        <Container
          flex={1}
          justifyContent="space-between"
          backgroundColor="white"
          padding={15}>
          <Container>
            <CustomInput
              value={values.about}
              label="About"
              height={200}
              numberOfLines={4}
              multiline
              onChangeText={handleChange('about')}
              error={errors.about}
            />
          </Container>

          <MainButton
            onPress={handleSubmit}
            enableButtonColor="secondary"
            color="white">
            Save about
          </MainButton>
        </Container>
      )}
    </Formik>
  );
};
export default UpdateAbout;
