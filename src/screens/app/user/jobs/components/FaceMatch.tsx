import React from 'react';
import {Image, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import IconI from 'react-native-vector-icons/Ionicons';
import MainButton from '../../../../../components/button/MainButton';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {TouchableOpacity} from 'react-native';
import jobService from '../service/Jobs.service';

const FaceMatch = React.forwardRef<ActionSheetRef, SheetProps<'FaceMatch'>>(
  (props, ref) => {
    const {isPending, mutate} = jobService.useIdentityVerification();
    const payload = props.payload;

    return (
      <ActionSheet
        gestureEnabled
        ref={ref}
        id="FaceMatch"
        overlayColor="black"
        defaultOverlayOpacity={0.5}>
        <View
          style={{
            flexDirection: 'row',
            gap: scale(90),
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 10,
            paddingBottom: 20,
          }}>
          <TouchableOpacity onPress={() => SheetManager.hide('FaceMatch')}>
            <Typography fontWeight="bold" color="gray" size="m2d">
              Cancel
            </Typography>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 6,
            }}>
            <Typography textAlign="center" fontWeight="semibold" size="m2d">
              Face match
            </Typography>
          </View>
        </View>
        <Image
          source={payload?.image}
          style={{
            width: '95%',
            alignSelf: 'center',
            height: verticalScale(400),
            borderRadius: 10,
          }}
        />
        <View style={{flexDirection: 'column', gap: 10, padding: scale(10)}}>
          <Typography fontWeight="bold" size="m3d">
            Is this the same person standing at your door?
          </Typography>
          <Typography fontWeight="regular" size="md" color="gray">
            Make sure you're confident before confirming. Your safety is
            important.
          </Typography>
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 10,
            padding: scale(10),
            paddingBottom: verticalScale(40),
          }}>
          <MainButton
            color="white"
            loading={isPending}
            onPress={() => {
              mutate(
                {
                  uuid: payload?.verificationPinParams?.uuid!,
                  verified: true,
                },
                {
                  onSuccess: () => {
                    SheetManager.hide('FaceMatch');
                    const timer = setTimeout(() => {
                      SheetManager.show('CancelJob', {
                        payload: {
                          navigation: payload?.navigation,
                          verificationPinParams: payload?.verificationPinParams,
                        },
                      });
                      clearTimeout(timer);
                    }, 1000);
                  },
                },
              );
            }}
            icon={() => <IconI name="checkmark" color={'#27A535'} size={15} />}
            enableButtonColor="lightGreen">
            Yes, it is them
          </MainButton>
          <MainButton
            loading={isPending}
            onPress={() => {
              mutate(
                {
                  uuid: payload?.verificationPinParams?.uuid!,
                  verified: false,
                },
                {onSuccess: () => SheetManager.hide('FaceMatch')},
              );
            }}
            icon={() => <Icon name="close" color={'#F0443A'} size={15} />}
            color="danger"
            enableButtonColor="pink">
            No, it's not them
          </MainButton>
        </View>
      </ActionSheet>
    );
  },
);
export default FaceMatch;
