import React from 'react';
import {Image, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from 'react-native-actions-sheet';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import Assets from '../../../../../assets/Assets';
import Typography from '../../../../../components/Typography';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import MainButton from '../../../../../components/button/MainButton';
import {useNavigation} from '@react-navigation/native';
import {IJobsRoute, Navigate} from '../../../../../@types/routes';

const CancelJob = React.forwardRef<ActionSheetRef, ICancelJob>((props, ref) => {
  const navigation = useNavigation<Navigate<IJobsRoute>>();

  return (
    <ActionSheet gestureEnabled ref={ref} id="CancelJob">
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
          Face Stay safe. Avoid letting unverified individuals into your space.
          You can cancel the job or report this incident to DailyHelp Support.
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
            navigation.navigate('VerificationPin');
          }}
          icon={() => <IconF name="lock" color={'#014C2B'} size={15} />}
          enableButtonColor="primary">
          Verify with PIN
        </MainButton>
        <MainButton
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
});
export default CancelJob;
