import {Formik} from 'formik';
import Container from '../../../components/container/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import CustomInput from '../../../components/customInput/Index';
import AttachmentContainer from '../../../components/AttachmentContainer';
import MainButton from '../../../components/button/MainButton';
import {IProfileSetup} from '../../../@types/routes';
import UploadContainer from '../../../components/UploadContainer';
import homeService from '../../app/user/home/services/Home.service';
import SaveHelpersDetailsDTO from '../../app/user/home/dto/SaveHelpersDetailsDto';
import createValidator from 'class-validator-formik';
import {SheetManager} from 'react-native-actions-sheet';

const ProfileSetup: IProfileSetup = ({navigation}) => {
  const {saveHelpersDetails, isPending} = homeService.useSaveHelpersDetails();

  return (
    <Container padding={10} flex={1} gap={20}>
      <ScreenHeader
        title="Profile set-up"
        description="Let clients know what you do and why you’re the right fit."
      />

      <Formik
        initialValues={new SaveHelpersDetailsDTO()}
        validate={createValidator(SaveHelpersDetailsDTO)}
        onSubmit={data => saveHelpersDetails(data)}>
        {({values,handleChange}) => (
          <Container width={'full'} justifyContent="space-between" height={600}>
            <Container width={'full'} gap={16}>
              <CustomInput
                type="select"
                label="Primary job role"
                placeholder="Select job role"
                selectType="AllCategory"
                width={'full'}
                onFocus={() => {
                  SheetManager.show('AllCategory',{onClose:d=>handleChange('')});
                }}
              />

              <CustomInput
                label="About"
                placeholder="Give a detailed description about what you do, years of experience, and your availability."
                multiline
                numberOfLines={20}
                height={180}
                maxLength={200}
                wordCount
              />

              <AttachmentContainer>
                <UploadContainer
                  title="Add Images of Your Work"
                  description="Showcase your best work with clear, high-quality photos."
                />
              </AttachmentContainer>
            </Container>

            <MainButton onPress={() => navigation.navigate('SetPrices')}>
              Save & continue
            </MainButton>
          </Container>
        )}
      </Formik>
    </Container>
  );
};
export default ProfileSetup;
