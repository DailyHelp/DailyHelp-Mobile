import {useNavigation} from '@react-navigation/native';
import {Linking, TouchableOpacity, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {IAuthRoute, Navigate} from '../@types/routes';
import Assets from '../assets/Assets';
import authService from '../screens/auth/services/Auth.service';
import {UserTypes} from '../shared/Constant';
import {scale, verticalScale} from '../shared/Scaling';
import {customFontSize, fonts} from '../shared/themes/Typography';
import ScreenHeader from './ScreenHeader';
import SwitchAccountModal from './SwitchAccountModal';

const FindServiceAuthModal: IFindServiceAuthModal<UserTypes> = ({
  isVisible,
  onClose,
  userType = UserTypes.CUSTOMER,
}) => {
  const navigation = useNavigation<Navigate<IAuthRoute>>();
  const {signIn, isGooglePending, switchModal} =
    authService.useGoogleSignAuth();

  return (
    <>
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
            <ScreenHeader
              title="Sign up to find services"
              description="Get the help you need from verified experts."
            />
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
                navigation.navigate('CreateAccount', {userType});
              }}
              mode="outlined"
              labelStyle={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.sm,
              }}
              contentStyle={{
                height: verticalScale(50),
                justifyContent: 'center',
              }}
              style={{borderRadius: 10, borderColor: '#DDDFE4'}}>
              Continue with Email
            </Button>
            <Button
              onPress={() => signIn(userType, () => onClose())}
              loading={isGooglePending}
              icon={() => <Assets.GoogleColored />}
              mode="outlined"
              labelStyle={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.sm,
              }}
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
              labelStyle={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.sm,
              }}
              contentStyle={{
                height: verticalScale(50),
                justifyContent: 'center',
              }}
              style={{borderRadius: 10, borderColor: '#DDDFE4'}}>
              Continue with Apple
            </Button>

            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate('Login', {userType});
              }}
              style={{flexDirection: 'row', justifyContent: 'center', gap: 4}}>
              <Text
                style={{
                  fontFamily: fonts.GeistBold,
                  fontSize: customFontSize.sm,
                  color: '#3B4152',
                }}>
                Already have an account?
              </Text>
              <Text
                style={{
                  fontFamily: fonts.GeistBold,
                  fontSize: customFontSize.sm,
                  color: '#017441',
                }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.sm,
                color: '#3B4152',
                textAlign: 'center',
                lineHeight: 20,
              }}>
              By continuing you agree with{' '}
              <Text style={{color: '#121419', fontFamily: fonts.GeistBold}}>
                our{' '}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://dailyhelpint.org/terms-of-use')
                }>
                <Text style={{color: '#006633', fontFamily: fonts.GeistBold}}>
                  Terms of Use
                </Text>
              </TouchableOpacity>
              <Text style={{color: '#121419', fontFamily: fonts.GeistBold}}>
                {' '}
                and{' '}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://dailyhelpint.org/privacy-policy')
                }>
                <Text
                  style={{
                    color: '#006633',
                    textAlign: 'center',
                    fontFamily: fonts.GeistBold,
                  }}>
                  Privacy Policies
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </Modal>
    </Portal>
    <SwitchAccountModal {...switchModal} />
    </>
  );
};
export default FindServiceAuthModal;
