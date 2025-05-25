import {View} from 'react-native';
import {Avatar, Badge} from 'react-native-paper';
import Assets from '../assets/Assets';
import {scale} from '../shared/Scaling';

const CustomAvatar: ICustomAvatar = ({
  avatarSize = 40,
  badgeSize = 16,
  bottom = 0,
  right = 0,
  data,
  showBadge = true,
}) => {
  let Badge = Assets.BronzeBadge;

  if (data?.badge === 'diamond') Badge = Assets.DiamondBadge;
  if (data?.badge === 'gold') Badge = Assets.GoldBadge;
  if (data?.badge === 'silver') Badge = Assets.SilverBadge;

  return (
    <View style={{position: 'relative'}}>
      <Avatar.Image size={avatarSize} source={data?.image} />
      {showBadge && (
        <Badge
          width={scale(badgeSize)}
          style={{position: 'absolute', bottom, right}}
        />
      )}
    </View>
  );
};

export default CustomAvatar;
