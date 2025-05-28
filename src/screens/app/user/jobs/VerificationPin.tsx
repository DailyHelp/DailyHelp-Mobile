import {View} from 'react-native';
import {IVerificationPin} from '../../../../@types/routes';
import CustomKeyPad from '../../../../components/CustiomKeyPad';
import Typography from '../../../../components/Typography';
import {scale} from '../../../../shared/Scaling';
import Otp from '../../../../components/Otp';
import React from 'react';

const VerificationPin: IVerificationPin = () => {
  const [value, setValue] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
      <View style={{flexDirection: 'column', gap: 10}}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            padding: scale(10),
          }}>
          <Typography fontWeight="bold" size="lg">
            Enter verification PIN
          </Typography>
          <Typography color="#757C91" textAlign="center" size="md">
            Enter the verification PIN sent to the service provider to confirm
            their identity
          </Typography>
        </View>
        <View style={{width: '80%', alignSelf: 'center'}}>
          <Otp pinCount={4} value={value} editable={false} />
        </View>
      </View>
      <CustomKeyPad
        onPress={key => {
          if (value.length < 4) setValue(prev => prev + key);
        }}
        onDelete={() => setValue(prev => prev.slice(0, -1))}
      />
    </View>
  );
};
export default VerificationPin;
