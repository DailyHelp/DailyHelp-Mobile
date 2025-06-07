import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import BackHeader from './BackHeader';
import ChatHeader from './ChatHeader';
import HomeHeader from './HomeHeader';
import SearchHeader from './SearchHeader';
import TabsHeader from './TabsHeader';

const CustomHeader: ICustomHeader<NativeStackHeaderProps> = ({
  type = 'back',
  ...props
}) => {
  return (
    <React.Fragment>
      {type === 'back' && <BackHeader {...props} />}
      {type === 'home' && <HomeHeader {...props} />}
      {type === 'chat' && <ChatHeader {...props} />}
      {type === 'tabs' && <TabsHeader {...props} />}
      {type === 'search' && <SearchHeader {...props} />}
    </React.Fragment>
  );
};
export default CustomHeader;
