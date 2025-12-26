import React from 'react';
import {View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import {IJobsRoute, Navigate} from '../../../../../@types/routes';
import Assets from '../../../../../assets/Assets';
import MainButton from '../../../../../components/button/MainButton';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';

const CancelJob = React.forwardRef<ActionSheetRef, SheetProps<'CancelJob'>>(
  (props, ref) => {
    const navigation = props.payload?.navigation as Navigate<IJobsRoute>;

    return (
      <ActionSheet
        gestureEnabled
        ref={ref}
        id="CancelJob"
        overlayColor="black"
        defaultOverlayOpacity={0.5}>
        <View
          style={{
            flexDirection: 'column',
            gap: scale(5),
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            paddingBottom: 20,
          }}>
          <Typography fontWeight="bold" size="m2d">
            Identity verification failed
          </Typography>

          <Typography
            textAlign="center"
            fontWeight="regular"
            size="md"
            color="lightBlack">
            Face Stay safe. Avoid letting unverified individuals into your
            space. You can cancel the job or report this incident to DailyHelp
            Support.
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
            onPress={() => {
              SheetManager.hide('CancelJob');
              SheetManager.hide('FaceMatch');
              if (navigation) {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'VerificationPin',
                    params: props.payload?.verificationPinParams,
                  }),
                );
              }
            }}
            icon={() => <IconF name="lock" color={'#014C2B'} size={15} />}
            enableButtonColor="primary">
            Verify with PIN
          </MainButton>
          <MainButton
            onPress={() => {}}
            icon={() => <Icon name="close" color={'#F0443A'} size={15} />}
            color="danger"
            enableButtonColor="pink">
            Cancel job
          </MainButton>
          <MainButton
            icon={() => <Assets.ChatAnnouncement style={{marginTop: 5}} />}
            color="black"
            enableButtonColor="lightGrey">
            Report
          </MainButton>
        </View>
      </ActionSheet>
    );
  },
);
export default CancelJob;
