import {Image, TouchableOpacity, View} from 'react-native';
import Assets from '../../../../assets/Assets';
import {appStore} from '../../../../shared/stores/appStore';
import {observer} from 'mobx-react-lite';
import {scale, verticalScale} from '../../../../shared/Scaling';
import MainButton from '../../../../components/button/MainButton';
import Icon from 'react-native-vector-icons/Fontisto';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';

const Preview: IPreview = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: verticalScale(800),
        }}>
        <View style={{position: 'relative'}}>
          <Assets.CameraBorder
            width={scale(250)}
            style={{alignSelf: 'center'}}
          />
          <Image
            alt="user selfie"
            source={{uri: `file://${appStore.selfiePhoto?.path}`}}
            style={{
              width: scale(230),
              height: verticalScale(240),
              position: 'absolute',
              top: verticalScale(40),
              alignSelf: 'center',
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{marginTop: verticalScale(150), width: '90%', gap: 20}}>
          <MainButton
            icon={() => (
              <Icon
                name="arrow-right-l"
                color={'#014C2B'}
                style={{marginTop: 3}}
              />
            )}
            moveIconRight
            onPress={() => navigation.navigate('ConfirmDetails')}>
            Looks good
          </MainButton>

          <TouchableOpacity
            onPress={() => appStore.setHideSelfieVerificationHeader(true)}
            style={{
              backgroundColor: '#F9F9FB',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 48,
              borderRadius: 10,
              gap: 5,
            }}>
            <Assets.Camera />
            <Text
              style={{
                fontSize: customFontSize.md,
                fontFamily: fonts.bold,
              }}>
              Retake
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default observer(Preview);
