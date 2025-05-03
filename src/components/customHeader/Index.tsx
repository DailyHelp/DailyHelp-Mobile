import React from 'react';
import {View} from 'react-native';
import BackHeader from './BackHeader';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const CustomHeader: ICustomHeader<NativeStackHeaderProps> = ({
  type = 'back',
  ...props
}) => {
  return (
    <React.Fragment>
      {type === 'back' && <BackHeader {...props} />}
    </React.Fragment>
  );
};
export default CustomHeader;
