import React from 'react';
import {View} from 'react-native';
import BackHeader from './BackHeader';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import HomeHeader from './HomeHeader';
import SearchHeader from './SearchHeader';
import ChatHeader from './ChatHeader';

const CustomHeader: ICustomHeader<NativeStackHeaderProps> = ({
  type = 'back',
  ...props
}) => {
  return (
    <React.Fragment>
      {type === 'back' && <BackHeader {...props} />}
      {type === 'home' && <HomeHeader {...props} />}
      {type === 'chat' && <ChatHeader {...props} />}
      {type === 'search' && <SearchHeader {...props} />}
    </React.Fragment>
  );
};
export default CustomHeader;
