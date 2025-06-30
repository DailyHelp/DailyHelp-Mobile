import {View} from 'react-native';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Assets from '../../../../../assets/Assets';
import Typography from '../../../../../components/Typography';
import {Divider} from 'react-native-paper';
import OutlineButton from '../../../../../components/button/OutlineButton';
import MainButton from '../../../../../components/button/MainButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SheetManager} from 'react-native-actions-sheet';

const JobsCard: IJobsCard = ({type = 'pending', viewDetails}) => {
  return (
    <View
      style={{
        padding: scale(10),
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'column',
        gap: 16,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <CustomAvatar
            avatarSize={50}
            badgeSize={20}
            data={{image: Assets.Worker1}}
          />

          <View style={{flexDirection: 'column', gap: 3}}>
            <Typography size="m2d">Amarachi Eze</Typography>
            <Typography size="md" color="gray">
              Hair stylist
            </Typography>
          </View>
        </View>

        <Typography color="secondary" fontWeight="bold">
          ₦32,000
        </Typography>
      </View>

      <Typography color="lightBlack" lineHeight={20}>
        I'm looking to style my hair into Bantu knots. See a sample of the look
        I'm trying to replicate.
      </Typography>

      {type !== 'pending' && (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#D6DBE7',
            borderStyle: 'dashed',
            padding: scale(10),
            backgroundColor: '#F9F9FB',
            borderRadius: 5,
            flexDirection: 'column',
            gap: 9,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Typography color="gray">Started</Typography>
            <Typography color="gray">Ended</Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Typography color="gray">23 Mar, 2025, 09:30</Typography>
            <Assets.JobsHourGlass />
          </View>
        </View>
      )}

      <Divider style={{backgroundColor: '#F1F2F4', height: verticalScale(2)}} />

      {type === 'completed' ? (
        <OutlineButton
          onPress={() => SheetManager.show('RateService')}
          icon={() => <Icon name="star" size={15} color={'#FFD100'} />}
          color="black">
          Rate service provider
        </OutlineButton>
      ) : (
        <View style={{flexDirection: 'row', gap: 6}}>
          <MainButton
            onPress={viewDetails}
            width={'75%'}
            enableButtonColor="lightGrey"
            color="black">
            View details
          </MainButton>

          <MainButton enableButtonColor="lightGrey">
            <Assets.SendOffer />
          </MainButton>
        </View>
      )}
    </View>
  );
};
export default JobsCard;
