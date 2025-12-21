import {Dimensions, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Typography from '../../../../../components/Typography';
import {IDispute} from '../../../../../@types/routes';
import {scale} from '../../../../../shared/Scaling';

const DisputeType: IDispute = ({scroll}) => {
  const {width} = Dimensions.get('window');
  const reports = [
    'Provider didn’t complete the work',
    'Service not as agreed',
    'Unprofessional or rude behavior',
    'Provider didn’t show up',
    'Safety or misconduct issue',
    'Requested payment outside the app',
    'Other',
  ];

  return (
    <View style={{backgroundColor: 'white', width}}>
      <View style={{flexDirection: 'column', gap: 10, padding: scale(20)}}>
        <Typography fontWeight="bold" size="lg">
          What’s the issue with this job?
        </Typography>
      </View>

      <View style={{flexDirection: 'column', padding: scale(20), gap: 20}}>
        {reports.map((title, key) => (
          <TouchableOpacity key={key} onPress={() => scroll?.(title)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Typography size="md" color="darkGray">
                {title}
              </Typography>

              <Icon name="right" color={'#C0C5D6'} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default DisputeType;
