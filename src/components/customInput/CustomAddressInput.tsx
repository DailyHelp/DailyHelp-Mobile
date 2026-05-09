import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import IconF from 'react-native-vector-icons/Feather';
import Assets from '../../assets/Assets';
import {scale} from '../../shared/Scaling';
import Typography from '../Typography';
import Container from '../container/Index';

const CustomAddressInput: IInput = ({
  label,
  placeholder,
  value,
  error,
  width,
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
    <Container width={width} gap={9}>
      <Typography size="md" fontWeight="semibold" color="gray">
        {label}
      </Typography>
      <TouchableOpacity
        onPress={() => {
          SheetManager.show('HomeAddress', {
            payload: {showCurrent: false, label, skipSubmit: true},
            onClose: select,
          });
        }}>
        <Container
          width={width}
          height={50}
          backgroundColor="lightGrey"
          flexDirection="row"
          gap={5}
          borderRadius={10}
          alignItems="center">
          <Assets.SearchResult style={{paddingRight: scale(40)}} />
          <Typography
            size="sm"
            fontWeight="bold"
            color={value ? 'lightBlack' : 'lighterGray'}>
            {address || placeholder}
          </Typography>
        </Container>
      </TouchableOpacity>
      <View>
        {hasError && (
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <IconF name={'alert-circle'} color="#FF3333" />
            <Typography color="danger" size="sm">
              {error}
            </Typography>
          </View>
        )}
      </View>
    </Container>
  );
};
export default CustomAddressInput;
