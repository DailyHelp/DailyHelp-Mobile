import {View} from 'react-native';
import {IFeedback} from '../../../../@types/routes';
import ScreenHeader from '../../../../components/ScreenHeader';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {Formik} from 'formik';
import CustomInput from '../../../../components/customInput/Index';
import MainButton from '../../../../components/button/MainButton';
import utils from '../../../../shared/Utils';

const Feedback: IFeedback = ({navigation}) => {
  utils.useHideBottomTab(navigation);
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: scale(16), flexDirection: 'column', gap: 30}}>
        <ScreenHeader
          title="We Value Your Feedback!"
          description="Help us improve DailyHelp by sharing your experience."
        />

        <Formik initialValues={{}} onSubmit={() => {}}>
          {() => (
            <View
              style={{
                height: verticalScale(600),
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'column', gap: 10}}>
                <CustomInput
                  label="Title"
                  placeholder="e.g  Feature Suggestion"
                />
                <CustomInput
                  multiline
                  numberOfLines={6}
                  height={verticalScale(200)}
                  label="Description"
                  placeholder="Tell us more about your experience"
                />
              </View>

              <MainButton>Submit feedback</MainButton>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};
export default Feedback;
