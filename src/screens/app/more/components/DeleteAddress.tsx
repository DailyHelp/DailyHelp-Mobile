import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Typography from '../../../../components/Typography';
import Container from '../../../../components/container/Index';
import MainButton from '../../../../components/button/MainButton';
import {appStore} from '../../../../shared/stores/appStore';
import { observer } from 'mobx-react-lite';

const DeleteAddress = React.forwardRef<
  ActionSheetRef,
  SheetProps<'DeleteAddress'>
>((props, ref) => {
  return (
    <ActionSheet
      ref={ref}
      id="DeleteAddress"
      closeOnPressBack={false}
      gestureEnabled={true}
      closable={false}
      overlayColor="black"
      defaultOverlayOpacity={0.5}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <View
        style={{
          padding: 16,
          flexDirection: 'column',
          gap: 20,
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              SheetManager.hide('DeleteAddress');
            }}>
            <Typography fontWeight="semibold" size="md" color="gray">
              ✕
            </Typography>
          </TouchableOpacity>
        </View>

        <Container gap={6}>
          <Typography fontWeight="bold" textAlign="center" size="md">
            Delete address
          </Typography>
          <Typography textAlign="center" size="md" lineHeight={26}>
            Are you sure you want to delete this address? Deleting this address
            will remove it from your list of addresses.
          </Typography>
        </Container>

        <Container gap={10}>
          <MainButton
            loading={appStore.actionSheetLoading.isDeletingAddress}
            onPress={() => props.payload?.onDelete()}
            enableButtonColor="pink"
            color="danger">
            Delete address
          </MainButton>
          <MainButton
            onPress={() => {
              SheetManager.hide('DeleteAddress');
            }}
            enableButtonColor="transparent"
            color="green">
            Cancel
          </MainButton>
        </Container>
      </View>
    </ActionSheet>
  );
});

export default observer(DeleteAddress);
