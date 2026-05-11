import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {IVerifyAccount} from '../../@types/routes';
import MainButton from '../../components/button/MainButton';
import Container from '../../components/container/Index';
import Otp from '../../components/Otp';
import OtpCountDown from '../../components/OtpCountDown';
import Typography from '../../components/Typography';
import {scale, verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import VerifyOtpDTO from './dto/VerifyOtpDto';
import authService from './services/Auth.service';
import utils from '../../shared/Utils';

const VerifyAccount: IVerifyAccount = ({route, navigation}) => {
  const [code, setCode] = React.useState({
    show: true,
    time: 1000 * 60,
  });

  const {loading, onSubmit, resendLoading, onResendOtp} =
    authService.useVerifyOtp();

  React.useEffect(() => {
    if (!route.params?.user_id || !route.params?.pin) {
      navigation.goBack();
    }
  }, [route.params]);

  const onComplete = async () => {
    setCode({...code, show: !code.show});
  };

  return (
    <Container type="scroll" padding={10}>
      <Container gap={6}>
        <Text
          style={{
            fontFamily: fonts.black,
            fontSize: customFontSize.lg,
            color: '#121921',
          }}>
          Verify your account
        </Text>
        <View style={{flexDirection: 'row', gap: 6, flexWrap: 'wrap'}}>
          <Text
            style={{
              fontFamily: fonts.GeistMedium,
              fontSize: customFontSize.sm,
              color: '#757C91',
            }}>
            Enter the 6-digit code sent to
          </Text>
          <Text
            style={{
              fontFamily: fonts.GeistBold,
              fontSize: customFontSize.sm,
              color: '#757C91',
            }}>
            {' '}
            {route?.params?.email || route.params?.phone}{' '}
          </Text>
          <Text
            style={{
              fontFamily: fonts.GeistMedium,
              fontSize: customFontSize.sm,
              color: '#757C91',
            }}>
            to verify your {route.params?.email ? 'account' : 'phone number'}.
          </Text>
        </View>
      </Container>

      <Formik initialValues={new VerifyOtpDTO()} onSubmit={() => {}}>
        {({values, errors, handleChange, handleSubmit}) => (
          <View
            style={{
              marginTop: verticalScale(20),
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: verticalScale(600),
            }}>
            <View style={{flexDirection: 'column', gap: 16}}>
              <Otp
                errorValue={errors.otp}
                handleChange={value => {
                  handleChange('otp')(value);

                  onSubmit(
                    {
                      otp: value,
                      otpActionType: route.params?.type,
                      pinId: route.params?.pin,
                      userUuid: route.params?.user_id,
                    },
                    data =>
                      navigation.navigate(route?.params?.to!, {
                        ...route.params?.payload,
                        userType: utils.getUserType(
                          data?.data.user?.userTypes,
                        )[0],
                      }),
                  );
                }}
                width={scale(13)}
                secureTextEntry={false}
                marginTop={0}
              />

              {loading && (
                <View
                  style={{flexDirection: 'row', gap: 5, alignSelf: 'center'}}>
                  <ActivityIndicator color="#C1FF1D" size={15} />
                  <Typography fontWeight="italics" color="gray">
                    Verifying
                  </Typography>
                </View>
              )}
            </View>

            <MainButton
              loading={resendLoading}
              data={code.show}
              onPress={() => {
                onResendOtp(
                  {
                    otpActionType: route.params?.type,
                    userUuid: route.params?.user_id,
                    phone: route.params?.phone,
                  },
                  d => {
                    if (d?.status && d?.data?.pinId) {
                      navigation.setParams({pin: d.data.pinId});
                      onComplete();
                    }
                  },
                );
              }}>
              {!code.show ? (
                'Resend code'
              ) : (
                <View style={{flexDirection: 'row', gap: 3}}>
                  <Typography fontWeight="bold" color="green" size="md">
                    Resend in
                  </Typography>

                  <OtpCountDown
                    initialSecondsRemaining={code.time}
                    onComplete={() => onComplete()}
                    allowFontScaling={true}
                    style={{
                      fontSize: customFontSize.md,
                      color: '#5A635E',
                      fontFamily: fonts.GeistBold,
                    }}
                  />
                </View>
              )}
            </MainButton>
          </View>
        )}
      </Formik>
    </Container>
  );
};
export default VerifyAccount;
