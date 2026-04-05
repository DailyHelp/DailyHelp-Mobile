import {View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {scale} from '../shared/Scaling';
import Badge from './Badge';

const CustomAvatar: ICustomAvatar = ({
  avatarSize = 40,
  badgeSize = 16,
  bottom = 0,
  right = 0,
  data,
  showBadge = true,
}) => {
  return (
    <View style={{position: 'relative'}}>
      {typeof data?.image === 'string' ? (
        <Avatar.Image size={avatarSize} source={{uri: data?.image}} />
      ) : (
        <Avatar.Image size={avatarSize} source={data?.image} />
      )}
      {showBadge && (
        <Badge
          size={badgeSize}
          data={data}
          style={{position: 'absolute', bottom, right}}
        />
      )}
    </View>
  );
};

export default CustomAvatar;
