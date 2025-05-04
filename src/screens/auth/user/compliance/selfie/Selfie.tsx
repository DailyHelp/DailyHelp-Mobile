import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Camera,
  CameraDevice,
  getCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Assets from '../../../../../assets/Assets';
import {verticalScale} from '../../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import {appStore} from '../../../../../shared/stores/appStore';
import ThrowError from '../../../../../shared/errors/throwError';
import {observer} from 'mobx-react-lite';

const FRAME_SIZE = 300;

const Selfie: ISelfie = ({}) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [device, setDevice] = React.useState<CameraDevice | undefined>();
  const camera = React.useRef<Camera>(null);

  React.useEffect(() => {
    const checkPermissionsAndSetDevice = async () => {
      const permission = await requestPermission(); // always await this
      if (!permission) return;

      const availableDevices = await Camera.getAvailableCameraDevices();
      const selectedDevice = getCameraDevice(availableDevices, 'front');

      if (!selectedDevice) {
        throw new ThrowError('No camera device found!');
      }

      setDevice(selectedDevice);
    };

    checkPermissionsAndSetDevice();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Icon
        name="close"
        color={'white'}
        size={20}
        onPress={() => appStore.setHideSelfieVerificationHeader(false)}
        style={{position: 'absolute', zIndex: 999, right: 20, top: 20}}
      />
      {device && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      )}

      <View style={StyleSheet.absoluteFill}>
        {/* Top dimmed area */}
        <View style={{flex: 0.4, backgroundColor: 'rgba(0,0,0,0.6)'}} />

        {/* Middle row */}
        <View style={{height: FRAME_SIZE, flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}} />
          <View style={styles.frameBox} />
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}} />
        </View>

        {/* Bottom area */}
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#3B4152',
              borderRadius: 30,
              marginTop: verticalScale(30),
              width: '80%',
              flexDirection: 'row',
              gap: 3,
            }}>
            <Assets.CameraFrame
              style={{
                marginTop: verticalScale(12),
                marginLeft: verticalScale(19),
              }}
            />
            <Text style={styles.instruction}>
              Align your head within the frame
            </Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              const photo = await camera.current?.takePhoto();

              appStore.setSelfiePhoto(photo!);
              appStore.setHideSelfieVerificationHeader(false);
            }}
            style={{marginTop: verticalScale(150)}}>
            <Assets.Shutter />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default observer(Selfie);

const styles = StyleSheet.create({
  frameBox: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    borderWidth: 2,
    borderColor: 'lime',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  instruction: {
    color: 'white',
    padding: 15,
    fontFamily: fonts.GeistMedium,
    fontSize: customFontSize.sm,
  },
});
