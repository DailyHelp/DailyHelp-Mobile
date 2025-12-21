import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import {scale} from '../../../../shared/Scaling';
import moreService from '../services/More.service';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../../../shared/stores/appStore';
import AppStorage from '../../../../shared/AppStorage';

const ConfirmDeleteActionSheet = React.forwardRef<
  ActionSheetRef,
  SheetProps<'ConfirmDelete'>
>((props, ref) => {
  const [password, setPassword] = React.useState('');

  const {isPending, mutate} = moreService.useConfirmDelete();

  const handleDelete = () => {
    if (password) {
      mutate(
        {uuid: AppStorage.find('user_id') as string, password},
        {
          onSuccess: () => {
            setPassword('');
            SheetManager.hide('ConfirmDelete');
          },
        },
      );
    }
  };

  return (
    <ActionSheet
      ref={ref}
      id="ConfirmDelete"
      closeOnPressBack={false}
      gestureEnabled={true}
      closable={true}
      overlayColor="black"
      defaultOverlayOpacity={0.5}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: 'white',
      }}>
      <View style={{padding: scale(24), paddingTop: scale(20)}}>
        <Container flexDirection="row" justifyContent="flex-end">
          <TouchableOpacity onPress={() => SheetManager.hide('ConfirmDelete')}>
            <Icon name="close" size={20} color="#757C91" />
          </TouchableOpacity>
        </Container>

        <Typography
          size="md"
          fontWeight="bold"
          textAlign="center"
          color="black">
          Confirm account deletion
        </Typography>

        {/* Description */}
        <Typography size="sm" color="gray" textAlign="center" marginTop={10}>
          Are you absolutely sure? This action cannot be undone. Enter your
          password to delete your account.
        </Typography>

        {/* Password Input */}
        <Container marginTop={15} marginBottom={25}>
          <CustomInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
          />
        </Container>

        {/* Delete Account Button */}
        <Container gap={10}>
          <MainButton
            onPress={handleDelete}
            enableButtonColor="danger"
            loading={isPending}
            color="white"
            icon={() => <Assets.Trash width={20} height={20} />}>
            Delete account
          </MainButton>

          <MainButton
            onPress={() => SheetManager.hide('ConfirmDelete')}
            enableButtonColor="lightGrey"
            color="black"
            mode="contained">
            Cancel
          </MainButton>
        </Container>
      </View>
    </ActionSheet>
  );
});

export default observer(ConfirmDeleteActionSheet);
