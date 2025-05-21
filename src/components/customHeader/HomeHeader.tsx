import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {scale, verticalScale} from '../../shared/Scaling';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Assets from '../../assets/Assets';
import {SheetManager} from 'react-native-actions-sheet';

const HomeHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  navigation,
  goBack,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: scale(10),
        paddingTop: scale(15),
        backgroundColor: 'white',
        paddingBottom: verticalScale(10),
      }}>
      <TouchableOpacity onPress={() => SheetManager.show('HomeAddress')}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Assets.HomeLocationPin style={{width: scale(30)}} />
          <Text
            style={{
              fontFamily: fonts.GeistBold,
              color: '#121921',
              fontSize: customFontSize.sm,
            }}>
            {title}
          </Text>
          <Icon name="chevron-down" color={'#757C91'} size={16} />
        </View>
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
    </View>
  );
};
export default HomeHeader;
