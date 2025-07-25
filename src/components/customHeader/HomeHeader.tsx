import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {scale, verticalScale} from '../../shared/Scaling';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Assets from '../../assets/Assets';
import {SheetManager} from 'react-native-actions-sheet';
import homeService from '../../screens/app/user/home/services/Home.service';
import utils from '../../shared/Utils';
import Container from '../container/Index';
import Typography from '../Typography';

const HomeHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  navigation,
  goBack,
}) => {
  const {data} = homeService.useSavedLocation();

  const location = data?.[0]?.description || title;
  const trimmedLocation = utils.ellipseText(location);

  return (
    <Container
      flexDirection="row"
      justifyContent="space-between"
      width={'full'}
      backgroundColor="white"
      alignItems="center"
      paddingHorizontal={10}
      height={50}>
      <TouchableOpacity
        onPress={() => {
          SheetManager.show('HomeAddress', {payload: {showCurrent: true}});
        }}>
        <Container flexDirection="row" gap={5}>
          <Assets.HomeLocationPin style={{width: scale(30)}} />
          <Typography color="black" size="sm">
            {trimmedLocation}
          </Typography>

          <Icon name="chevron-down" color={'#757C91'} size={16} />
        </Container>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#F9F9FB',
          width: scale(45),
          height: verticalScale(45),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
        }}>
        <Assets.HomeBell />
      </TouchableOpacity>
    </Container>
  );
};
export default HomeHeader;
