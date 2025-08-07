import {View} from 'react-native';
import {IChatRoute, Navigate} from '../@types/routes';
import Assets from '../assets/Assets';
import MainButton from './button/MainButton';
import Container from './container/Index';
import Typography from './Typography';

const EmptyState: IEmptyState<Navigate<IChatRoute>> = ({
  navigation,
  header,
  title,
  subTitle,
  type = 'chat',
  height = 600,
  width = 'full',
  showButton = true,
}) => {
  return (
    <Container
      flex={1}
      width={width}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignSelf='center'
      height={height}
      gap={16}>
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

      {showButton && (
        <MainButton onPress={() => navigation?.navigate('HomeIndex')}>
          Find service providers
        </MainButton>
      )}
    </Container>
  );
};

export default EmptyState;
