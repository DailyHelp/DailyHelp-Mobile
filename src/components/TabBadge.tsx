import React from 'react';
import {View, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {appStore} from '../shared/stores/appStore';
import {scale, verticalScale} from '../shared/Scaling';

interface TabBadgeProps {
  tabName: string;
  children: React.ReactNode;
}

const TabBadge: React.FC<TabBadgeProps> = observer(({tabName, children}) => {
  const badgeCount = appStore.tabBadges[tabName] || 0;

  return (
    <View style={{position: 'relative'}}>
      {children}
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: '#27A535',
            borderRadius: scale(10),
            minWidth: scale(20),
            height: scale(20),
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scale(4),
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: scale(12),
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
});

export default TabBadge;
