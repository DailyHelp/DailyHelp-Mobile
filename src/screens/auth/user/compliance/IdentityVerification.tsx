import {ScrollView, View} from 'react-native';
import {IIdentityVerification} from '../../../../@types/routes';
import MainButton from '../../../../components/button/MainButton';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import CustomInput from '../../../../components/customInput/Index';
import Icon from 'react-native-vector-icons/Fontisto';
import {verticalScale} from '../../../../shared/Scaling';
import ScreenHeader from '../../../../components/ScreenHeader';

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
          gap: 30,
        }}>
        <ScreenHeader
          title="Identity Verification"
          description="We use NIN and BVN together to confirm who you are and comply with
              regulatory requirements."
        />
        <View
          style={{height: verticalScale(600), justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', gap: 10}}>
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
      </View>
    </ScrollView>
  );
};
export default IdentityVerification;
