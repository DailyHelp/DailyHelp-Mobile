import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Assets from '../../../../assets/Assets';
import Typography from '../../../../components/Typography';
import Container from '../../../../components/container/Index';
import {ActivityIndicator} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../../../shared/stores/appStore';

const AddressOptions = React.forwardRef<
  ActionSheetRef,
  SheetProps<'AddressOptions'>
>((props, ref) => {
  const selection = [
    {
      name: 'Set as default address',
      Icon: Assets.PlainLocation,
      navigate: () => props.payload?.onSetDefault(),
      loading: appStore.actionSheetLoading.isDefaultLoading,
    },
    {
      name: 'Delete address',
      Icon: Assets.Trash,
      navigate: () => {
        SheetManager.show('DeleteAddress', {
          payload: {
            onDelete: () => props.payload?.onDelete(),
          },
        });
      },
      loading: false,
    },
  ];

  return (
    <ActionSheet
      ref={ref}
      id="AddressOptions"
      backgroundInteractionEnabled={true}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: 'white',
      }}
      initialSnapIndex={0}>
      <View
        style={{
          padding: 16,
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => SheetManager.hide('AddressOptions')}>
            <Typography fontWeight="semibold" size="md" color="gray">
              Cancel
            </Typography>
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md" color="black">
            Options
          </Typography>
          <View style={{width: 50}} />
        </View>

        <Container padding={10} flexDirection="column" gap={30} marginTop={30}>
          {selection.map(({name, Icon, navigate, loading}, key) => (
            <TouchableOpacity key={name + key} onPress={navigate}>
              <Container flexDirection="row" justifyContent="space-between">
                <Container flexDirection="row" alignItems="center" gap={6}>
                  <Icon />
                  <Typography size="md">{name}</Typography>
                </Container>

                {loading && <ActivityIndicator size={20} />}
              </Container>
            </TouchableOpacity>
          ))}
        </Container>
      </View>
    </ActionSheet>
  );
});
export default observer(AddressOptions);
