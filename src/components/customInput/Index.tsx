import React from 'react';
import CustomTextInput from './CustomTextInput';
import CustomPhoneInput from './CustomPhoneInput';
import CustomPasswordInput from './CustomPasswordInput';
import CustomDateInput from './CustomDateInput';
import CustomAddressInput from './CustomAddressInput';
import CustomSelectInput from './customSelectInput/Index';
import CustomSwitchInput from './CustomSwitch';

const CustomInput: IInput = ({type = 'text', ...props}) => {
  if (type === 'phone') return <CustomPhoneInput {...props} />;

  if (type === 'password') return <CustomPasswordInput {...props} />;

  if (type === 'date') return <CustomDateInput {...props} />;

  if (type === 'address') return <CustomAddressInput {...props} />;

  if (type === 'switch') return <CustomSwitchInput {...props} />;

  if (type === 'select') return <CustomSelectInput {...props} />;

  return <CustomTextInput {...props} />;
};
export default CustomInput;
