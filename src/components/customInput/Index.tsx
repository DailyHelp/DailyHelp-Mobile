import React from 'react';
import CustomTextInput from './CustomTextInput';
import CustomPhoneInput from './CustomPhoneInput';
import CustomPasswordInput from './CustomPasswordInput';
import CustomDateInput from './CustomDateInput';

const CustomInput: IInput = ({type = 'text', ...props}) => {
  if (type === 'phone') return <CustomPhoneInput {...props} />;

  if (type === 'password') return <CustomPasswordInput {...props} />;
  
  if (type === 'date') return <CustomDateInput {...props} />;

  return <CustomTextInput {...props} />;
};
export default CustomInput;
