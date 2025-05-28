import {Dimensions, View} from 'react-native';
import {IReport} from '../../../../../@types/routes';
import Typography from '../../../../../components/Typography';
import {scale} from '../../../../../shared/Scaling';
import CustomInput from '../../../../../components/customInput/Index';

const ReportDetails: IReport = () => {
  const {width} = Dimensions.get('window');

  return (
    <View style={{backgroundColor: 'white', width}}>
      <View style={{flexDirection: 'column', gap: 10, padding: scale(20)}}>
        <Typography fontWeight="bold" size="xlg">
          Provide more details
        </Typography>
        <Typography fontWeight="regular" size="md" color="#757C91">
          Tell us more about what happened
        </Typography>
      </View>

      <View style={{flexDirection: 'column', gap: 10, padding: scale(20)}}>
        <CustomInput
          label="Description"
          height={150}
          multiline
          numberOfLines={6}
          placeholder="Describe in detail what happened."
        />
      </View>
    </View>
  );
};
export default ReportDetails;
