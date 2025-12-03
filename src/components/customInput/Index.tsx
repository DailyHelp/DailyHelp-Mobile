import React from 'react';
import CustomTextInput from './CustomTextInput';
import CustomPhoneInput from './CustomPhoneInput';
import CustomPasswordInput from './CustomPasswordInput';
import CustomDateInput from './CustomDateInput';
import CustomAddressInput from './CustomAddressInput';
import CustomSelectInput from './customSelectInput/Index';
import CustomSwitchInput from './CustomSwitch';
import {createNumberMask, useMaskedInputProps} from 'react-native-mask-input';

const amount = createNumberMask({
  prefix: [],
  delimiter: ',',
  separator: ',',
  precision: 3,
});

const CustomInput: IInput = ({type = 'text', mask, maskType, ...props}) => {
  const amountCheck = ['amount'];

  const maskedInputProps = useMaskedInputProps({
    value: props.value as string,
    onChangeText: (masked: string, text: string) => props.onChangeText?.(text),
    mask: amountCheck.includes(maskType as string) ? amount : mask,
  });

  maskedInputProps.placeholder = props.placeholder;

  if (type === 'phone') return <CustomPhoneInput {...props} />;

  if (type === 'password') return <CustomPasswordInput {...props} />;

  if (type === 'date') return <CustomDateInput {...props} />;

  if (type === 'address') return <CustomAddressInput {...props} />;

  if (type === 'switch') return <CustomSwitchInput {...props} />;

  if (type === 'select') return <CustomSelectInput {...props} />;

  return mask ? (
    <CustomTextInput {...props} {...maskedInputProps} />
  ) : (
    <CustomTextInput {...props} />
  );
};
export default CustomInput;
