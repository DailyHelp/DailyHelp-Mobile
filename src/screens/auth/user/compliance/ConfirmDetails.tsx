import {Image, View} from 'react-native';
import {IConfirmDetails} from '../../../../@types/routes';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import {appStore} from '../../../../shared/stores/appStore';
import {scale, verticalScale} from '../../../../shared/Scaling';
import MainButton from '../../../../components/button/MainButton';

const ConfirmDetails: IConfirmDetails = ({navigation}) => {
  const user_data = [
    {
      title: 'Full name',
      data: 'Adebayo Tobiloba James',
    },
    {
      title: 'Date of Birth',
      data: '23 May, 1994',
    },
    {
      title: 'Gender',
      data: 'Male',
    },
    {
      title: 'NIN',
      data: '8123761890231',
    },
    {
      title: 'BVN',
      data: '22346578912',
    },
  ];

  return (
    <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
      <View style={{flexDirection: 'column', gap: 6}}>
        <Text
          style={{
            fontFamily: fonts.black,
            fontSize: customFontSize.lg,
            color: '#121921',
          }}>
          Confirm details
        </Text>
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: customFontSize.md,
            color: '#757C91',
          }}>
          Review your details before submitting for verification.
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          marginTop: verticalScale(30),
        }}>
        <Image
          alt="user selfie"
          source={{uri: `file://${appStore.selfiePhoto?.path}`}}
          style={{
            width: scale(230),
            height: verticalScale(240),
            alignSelf: 'center',
            borderRadius: 999,
            marginTop: verticalScale(30),
          }}
        />

        <View
          style={{
            flexDirection: 'column',
            gap: 18,
            marginTop: verticalScale(18),
          }}>
          {user_data.map(({data, title}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: customFontSize.md,
                }}>
                {title}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.bold,
                  fontSize: customFontSize.md,
                }}>
                {data}
              </Text>
            </View>
          ))}
        </View>

        <View style={{marginTop: verticalScale(100)}}>
          <MainButton onPress={() => navigation.navigate('Verifying')}>
            Verify Identity
          </MainButton>
        </View>
      </View>
    </View>
  );
};
export default ConfirmDetails;
