import {ScrollView, View} from 'react-native';
import {IIdentityVerification} from '../../../../@types/routes';
import MainButton from '../../../../components/button/MainButton';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import CustomInput from '../../../../components/customInput/Index';
import Icon from 'react-native-vector-icons/Fontisto';
import {verticalScale} from '../../../../shared/Scaling';

const IdentityVerification: IIdentityVerification = ({navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          height: verticalScale(700),
        }}>
        <View
          style={{
            flexDirection: 'column',
            gap: 20,
          }}>
          <View style={{flexDirection: 'column', gap: 6}}>
            <Text
              style={{
                fontFamily: fonts.black,
                fontSize: customFontSize.lg,
                color: '#121921',
              }}>
              Identity Verification
            </Text>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: customFontSize.md,
                color: '#757C91',
              }}>
              We use NIN and BVN together to confirm who you are and comply with
              regulatory requirements.
            </Text>
          </View>

          <CustomInput
            placeholder="Enter your NIN"
            label="National Identification Number"
          />

          <CustomInput
            placeholder="Enter your BVN"
            label="Bank Verification Number"
          />
        </View>

        <MainButton
          icon={() => (
            <Icon
              name="arrow-right-l"
              color={'#014C2B'}
              style={{marginTop: 3}}
            />
          )}
          moveIconRight
          onPress={() => navigation.navigate('FacialVerification')}>
          Next
        </MainButton>
      </View>
    </ScrollView>
  );
};
export default IdentityVerification;
