import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Camera,
  CameraDevice,
  getCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Assets from '../../../../assets/Assets';
import {verticalScale} from '../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import {appStore} from '../../../../shared/stores/appStore';
import ThrowError from '../../../../shared/errors/throwError';
import {observer} from 'mobx-react-lite';

const FRAME_SIZE = 300;

const Selfie: ISelfie = ({}) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [device, setDevice] = useState<CameraDevice | undefined>();
  const [loading, setLoading] = useState(true);
  const camera = useRef<Camera>(null);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const granted = await requestPermission();
      if (!granted || !isMounted) return;

      const devices = await Camera.getAvailableCameraDevices();
      const front = getCameraDevice(devices, 'front');
      if (!front) {
        throw new ThrowError('No front camera device found');
      }

      if (isMounted) {
        setDevice(front);
        setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      appStore.setSelfiePhoto(photo!);
      appStore.setHideSelfieVerificationHeader(false);
    } catch (err) {
      console.error('Error taking photo', err);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {/* Close Button */}
      <Icon
        name="close"
        color={'white'}
        size={24}
        onPress={() => appStore.setHideSelfieVerificationHeader(false)}
        style={{position: 'absolute', zIndex: 999, right: 20, top: 20}}
      />

      {/* Show loading indicator until camera is ready */}
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Render camera only when device is ready */}
      {!loading && device && hasPermission && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      )}

      {/* UI Overlay */}
      <View style={StyleSheet.absoluteFill}>
        {/* Top dimmed area */}
        <View style={{flex: 0.4, backgroundColor: 'rgba(0,0,0,0.6)'}} />

        {/* Middle row */}
        <View style={{height: FRAME_SIZE, flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}} />
          <View style={styles.frameBox} />
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}} />
        </View>

        {/* Bottom dimmed area */}
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
            onPress={takePhoto}
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
