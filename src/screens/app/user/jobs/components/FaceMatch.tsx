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
import IconI from 'react-native-vector-icons/Ionicons';
import MainButton from '../../../../../components/button/MainButton';

const FaceMatch = React.forwardRef<ActionSheetRef, IFaceMatch>((props, ref) => {
  return (
    <ActionSheet gestureEnabled ref={ref} id="FaceMatch">
      <View
        style={{
          flexDirection: 'row',
          gap: scale(90),
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 10,
          paddingBottom: 20,
        }}>
        <Typography fontWeight="bold" color="#757C91" size="m2d">
          Cancel
        </Typography>

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
        source={Assets.Worker1}
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
        <Typography fontWeight="regular" size="md" color="#757C91">
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
          onPress={() => {
            SheetManager.hide('FaceMatch');
            const timer = setTimeout(() => {
              SheetManager.show('CancelJob');
              clearTimeout(timer);
            }, 1000);
          }}
          icon={() => <IconI name="checkmark" color={'#27A535'} size={15} />}
          enableButtonColor="#D6F5D9">
          Yes, it is them
        </MainButton>
        <MainButton
          icon={() => <Icon name="close" color={'#F0443A'} size={15} />}
          enableColor="#F0443A"
          enableButtonColor="#FDE9E7">
          No, it's not them
        </MainButton>
      </View>
    </ActionSheet>
  );
});
export default FaceMatch;
