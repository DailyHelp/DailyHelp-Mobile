import React from 'react';
import {TouchableOpacity} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';

const ConfirmDeleteActionSheet = React.forwardRef<
  ActionSheetRef,
  IConfirmDeleteActionSheet
>((props, ref) => {
  return (
    <ActionSheet
      ref={ref}
      id="ConfirmDelete"
      closeOnPressBack={false}
      gestureEnabled={true}
      closable={false}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <Container padding={16} height={750}>
        <Container
          flexDirection="row"
          justifyContent="flex-end"
          marginBottom={12}>
          <TouchableOpacity>{/* <Assets. */}</TouchableOpacity>
        </Container>

        <Container>
          <Typography size="md" fontWeight="semibold" textAlign="center">
            Confirm account deletion
          </Typography>
        </Container>
      </Container>
    </ActionSheet>
  );
});

export default ConfirmDeleteActionSheet;
