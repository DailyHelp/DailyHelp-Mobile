import {View} from 'react-native';
import Assets from '../assets/Assets';
import Typography from './Typography';
import {verticalScale} from '../shared/Scaling';
import MainButton from './button/MainButton';
import {IChatRoute, Navigate} from '../@types/routes';

const EmptyState: IEmptyState<Navigate<IChatRoute>> = ({
  navigation,
  header,
  title,
  subTitle,
  type = 'chat',
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        height: verticalScale(600),
      }}>
      {type === 'chat' && <Assets.EmptyChat />}
      {type === 'jobs' && <Assets.JobsEmpty />}

      <Typography fontWeight="bold" size="m2d" textAlign="center">
        {header}
      </Typography>

      <View style={{flexDirection: 'column', gap: 7}}>
        <Typography size="m2d" textAlign="center" color="gray">
          {title}
        </Typography>
        {subTitle && (
          <Typography size="m2d" textAlign="center" color="gray">
            {subTitle}
          </Typography>
        )}
      </View>

      <MainButton onPress={() => navigation?.navigate('HomeIndex')}>
        Find service providers
      </MainButton>
    </View>
  );
};

export default EmptyState;
