import {View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {customFontSize, fonts} from '../shared/themes/Typography';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale, verticalScale} from '../shared/Scaling';
import Assets from '../assets/Assets';
import {useNavigation} from '@react-navigation/native';
import {IAuthRoute, Navigate} from '../@types/routes';
import AppStorage from '../shared/AppStorage';
import {UserTypes} from '../shared/Constant';

const FindServiceAuthModal: IFindServiceAuthModal = ({
  isVisible,
  onClose,
  onPress,
}) => {
  const navigation = useNavigation<Navigate<IAuthRoute>>();

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onClose}
        contentContainerStyle={{
          position: 'absolute',
          bottom: 20,
          width: '95%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: verticalScale(400),
            padding: scale(25),
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
            gap: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <View style={{flexDirection: 'column', gap: 6}}>
              <Text
                style={{
                  fontFamily: fonts.black,
                  fontSize: customFontSize.lg,
                  color: '#121921',
                }}>
                Sign up to find services
              </Text>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: customFontSize.md,
                  color: '#757C91',
                }}>
                Get the help you need from verified experts.
              </Text>
            </View>
            <Icon name="close" size={15} onPress={() => onClose()} />
          </View>

          <View
            style={{
              flexDirection: 'column',
              gap: 15,
            }}>
            <Button
              icon={() => <Assets.EmailOutlined />}
              onPress={() => {
                onClose();
                AppStorage.save('user_type', UserTypes.USER);
                navigation.navigate('CreateAccount');
              }}
              mode="outlined"
              contentStyle={{
                height: verticalScale(50),
                justifyContent: 'center',
              }}
              style={{borderRadius: 10, borderColor: '#DDDFE4'}}>
              Continue with Email
            </Button>
            <Button
              icon={() => <Assets.GoogleColored />}
              mode="outlined"
              contentStyle={{
                height: verticalScale(50),
                justifyContent: 'center',
              }}
              style={{borderRadius: 10, borderColor: '#DDDFE4'}}>
              Continue with Google
            </Button>
            <Button
              icon={() => <Assets.Apple />}
              mode="outlined"
              contentStyle={{
                height: verticalScale(50),
                justifyContent: 'center',
              }}
              style={{borderRadius: 10, borderColor: '#DDDFE4'}}>
              Continue with Apple
            </Button>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: customFontSize.m2d,
                color: '#3B4152',
                textAlign: 'center',
                lineHeight: 20,
              }}>
              By continuing you agree with{' '}
              <Text style={{color: '#121419', fontFamily: fonts.bold}}>
                our{' '}
              </Text>
              <Text style={{color: '#006633', fontFamily: fonts.bold}}>
                Terms of Use
              </Text>
              <Text style={{color: '#121419', fontFamily: fonts.bold}}>
                {' '}
                and{' '}
              </Text>
              <Text
                style={{
                  color: '#006633',
                  textAlign: 'center',
                  fontFamily: fonts.bold,
                }}>
                Privacy Policies
              </Text>
            </Text>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default FindServiceAuthModal;
