import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { scale } from '../shared/Scaling';
import { appStore } from '../shared/stores/appStore';
import Container from './container/Index';
import Typography from './Typography';

const TabBadge: ITabBadge = observer(({tabName, children}) => {
  const badgeCount = appStore.tabBadges[tabName] || 0;

  return (
    <Container position="relative">
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
          <Typography
            color="white"
            size="sm"
            fontWeight="bold"
            textAlign="center">
            {badgeCount > 99 ? '99+' : badgeCount}
          </Typography>
        </View>
      )}
    </Container>
  );
});

export default TabBadge;
