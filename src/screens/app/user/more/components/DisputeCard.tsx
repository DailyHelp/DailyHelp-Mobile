import {View} from 'react-native';
import Assets from '../../../../../assets/Assets';
import CustomAvatar from '../../../../../components/CustomAvatar';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';

const DisputeCard: IDisputeCard = ({type, data}) => {
  let color = '#757C91';
  let backgroundColor = '#F3F4F6';

  if (data?.status === 'full') {
    color = '#27A535';
    backgroundColor = '#E6FFF4';
  }

  if (data?.status === 'partial') {
    color = '#FF6B01';
    backgroundColor = '#FFF3EB';
  }

  return (
    <View
      style={{
        padding: scale(15),
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'column',
        gap: 16,
        margin: verticalScale(10),
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
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Typography size="xs" color="#757C91">
                23 Mar, 2025
              </Typography>
              <View
                style={{
                  height: verticalScale(7),
                  width: scale(1),
                  backgroundColor: '#757C91',
                }}
              />
              <Typography size="xs" color="#757C91">
                Dispute ID #DH0981
              </Typography>
            </View>
          </View>
        </View>

        <Typography color="#017441" fontWeight="bold">
          ₦32,000
        </Typography>
      </View>
      <View style={{flexDirection: 'column', gap: 12}}>
        <Typography fontWeight="bold">
          Provider didn’t complete the work
        </Typography>
        <Typography color="#3B4152" lineHeight={20}>
          I want to try making Bantu knots with my hair. Can you share a picture
          of what I'm hoping to create?
        </Typography>

        {type === 'resolved' && (
          <View style={{padding: scale(10), backgroundColor, borderRadius: 10}}>
            <Typography fontWeight="semibold" color={color} textAlign="center">
              Service Provider Paid - ₦32,000
            </Typography>
          </View>
        )}
      </View>
    </View>
  );
};
export default DisputeCard;
