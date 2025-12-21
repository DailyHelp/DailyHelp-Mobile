import {Dimensions, TouchableOpacity, View} from 'react-native';
import Typography from '../../../../components/Typography';
import {IReport} from '../../../../@types/routes';
import {scale} from '../../../../shared/Scaling';
import Icon from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../../../shared/stores/appStore';
import {UserTypes} from '../../../../shared/Constant';

const ReportType: IReport = ({scroll}) => {
  const isProvider = appStore.user_types === UserTypes.PROVIDER;
  const {width} = Dimensions.get('window');
  let reports = [
    'Fake identity or impersonation',
    'Overcharged or changed price',
    'Scammed or misled',
    'Asked to pay outside the app',
    'Harassment or inappropriate behavior',
    'No-show or late arrival',
    'Offensive language or conduct',
    'Poor quality of service',
    'Shared personal contact details',
    'Other',
  ];

  if (isProvider) {
    reports = [
      'Abusive or Inappropriate Language',
      'Attempts to Move Outside the Platform',
      'Fraudulent Activity',
      'False Job Information',
      'Unreasonable or Excessive Demands',
      'Repeated Cancellations',
      'Non-Payment or Payment Refusal',
      'Harassment or Threats',
      'Suspicious or Illegal Requests',
      'Other',
    ];
  }

  return (
    <View style={{backgroundColor: 'white', width}}>
      <View style={{flexDirection: 'column', gap: 10, padding: scale(20)}}>
        <Typography fontWeight="bold" size="xlg">
          {isProvider ? 'Report client' : 'Report service provider'}
        </Typography>
        <Typography fontWeight="regular" size="md" color="gray">
          Help us understand what went wrong. Your report stays private.
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
export default observer(ReportType);
