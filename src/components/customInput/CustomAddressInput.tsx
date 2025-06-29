import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import IconF from 'react-native-vector-icons/Feather';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';
import Typography from '../Typography';

const CustomAddressInput: IInput = ({
  label,
  placeholder,
  value,
  error,
  onAddressSelect,
}) => {
  const [address, setAddress] = React.useState(value);

  React.useEffect(() => {
    setAddress(value);
  }, [value]);

  const hasError = !!error;

  const select = (data?: {address?: string; lat?: number; lng?: number}) => {
    setAddress(data?.address);
    onAddressSelect?.(data);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          SheetManager.show('HomeAddress', {
            payload: {showCurrent: false, label},
            onClose: select,
          });
        }}
        style={{flexDirection: 'column', gap: 9}}>
        <Typography size="md" fontWeight="bold" color="#757C91">
          {label}
        </Typography>

        <View
          style={{
            height: verticalScale(50),
            backgroundColor: '#F9F9FB',
            borderRadius: 10,
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}>
          <Assets.SearchResult style={{paddingRight: scale(40)}} />
          <Typography
            size="sm"
            fontWeight="bold"
            color={value ? '#3B4152' : '#A9AFC2'}>
            {address || placeholder}
          </Typography>
        </View>
      </TouchableOpacity>
      <View>
        {hasError && (
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <IconF name={'alert-circle'} color="#FF3333" />
            <Typography color="#FF3333" size="sm">
              {error}
            </Typography>
          </View>
        )}
      </View>
    </View>
  );
};
export default CustomAddressInput;
