import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
  RenderModeType,
  RtcSurfaceView,
  createAgoraRtcEngine,
} from 'react-native-agora';
import Typography from '../../../components/Typography';
import Container from '../../../components/container/Index';
import CustomAvatar from '../../../components/CustomAvatar';
import MainButton from '../../../components/button/MainButton';
import OutlineButton from '../../../components/button/OutlineButton';
import {scale, verticalScale} from '../../../shared/Scaling';
import Assets from '../../../assets/Assets';
import homeService from '../user/home/services/Home.service';
import chatService from './services/Chat.service';
import {IVideoCall} from '../../../@types/routes';

type VideoCallParams = {
  token?: string;
  channelName?: string;
  peerAvatar?: string;
  isIncoming?: boolean;
  autoJoin?: boolean;
};

const VideoCall: IVideoCall = ({navigation, route}) => {
  const user = homeService.useUser();
  const {config} = chatService.useAgoraToken(route.params?.conversationUuid!);
  const params = (route?.params || {}) as Partial<VideoCallParams>;

  const agoraEngineRef = React.useRef<IRtcEngine | null>(null);
  const eventHandler = React.useRef<IRtcEngineEventHandler | null>(null);
  const ringtoneIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = React.useRef(false);

  const [isJoined, setIsJoined] = React.useState(false);
  const [callStatus, setCallStatus] = React.useState<
    'idle' | 'ringing' | 'connecting' | 'in-call' | 'ended'
  >('ringing');
  const [isIncoming] = React.useState<boolean>(Boolean(params?.isIncoming));
  const [peerAvatar] = React.useState<string | undefined>(params?.peerAvatar);

  const [remoteUid, setRemoteUid] = React.useState<number | null>(null);
  const [localUid, setLocalUid] = React.useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = React.useState(false);
  const [isVideoMuted, setIsVideoMuted] = React.useState(false);
  const [isFrontCamera, setIsFrontCamera] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (isMountedRef.current) {
        navigation?.goBack();
        return;
      }
      isMountedRef.current = true;

      return () => {
        isMountedRef.current = false;
      };
    }, [navigation]),
  );

  const stopRingtone = React.useCallback(() => {
    if (ringtoneIntervalRef.current) {
      clearInterval(ringtoneIntervalRef.current);
      ringtoneIntervalRef.current = null;
    }
    // No vibration to cancel for video calls
  }, []);

  const playRingtone = React.useCallback(() => {
    // Disable vibration for video calls – keep this as a no-op
  }, [isIncoming, callStatus]);

  React.useEffect(() => {
    if (isIncoming && callStatus === 'ringing') {
      playRingtone();
      return () => {
        stopRingtone();
      };
    }

    return () => {
      stopRingtone();
    };
  }, [isIncoming, callStatus, playRingtone, stopRingtone]);

  const setupEventHandler = React.useCallback(() => {
    if (!agoraEngineRef.current) {
      return;
    }

    eventHandler.current = {
      onJoinChannelSuccess: (_connection: RtcConnection) => {
        setIsJoined(true);
        setCallStatus('in-call');
        stopRingtone();
      },
      onUserJoined: (_connection: RtcConnection, uid: number) => {
        setRemoteUid(uid);
      },
      onUserOffline: (_connection: RtcConnection, uid: number) => {
        if (remoteUid === uid) {
          setRemoteUid(null);
        }
        setCallStatus('ended');
        stopRingtone();
        setTimeout(() => {
          navigation?.goBack();
        }, 1000);
      },
      onError: (err: number, msg: string) => {
        console.error('Agora error:', err, msg);
        setCallStatus('ended');
        stopRingtone();
      },
      onLeaveChannel: () => {
        setIsJoined(false);
        setRemoteUid(null);
        setCallStatus('ended');
        stopRingtone();
      },
    };

    agoraEngineRef.current.registerEventHandler(eventHandler.current);
  }, [navigation, remoteUid, stopRingtone]);

  const getPermission = React.useCallback(async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  }, []);

  const setupVideoSDKEngine = React.useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        await getPermission();
      }

      if (!config?.appId) {
        return;
      }

      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      await agoraEngine.initialize({appId: config.appId});

      agoraEngine.enableVideo();
      agoraEngine.startPreview();
    } catch (error) {
      console.error('Failed to initialize Agora video engine:', error);
      setCallStatus('ended');
    }
  }, [config?.appId, getPermission]);

  const cleanupAgoraEngine = React.useCallback(() => {
    stopRingtone();

    if (agoraEngineRef.current) {
      try {
        agoraEngineRef.current.unregisterEventHandler(eventHandler.current!);
        agoraEngineRef.current.leaveChannel();
        agoraEngineRef.current.stopPreview();
        agoraEngineRef.current.release();
        agoraEngineRef.current = null;
      } catch (error) {
        console.error('Error cleaning up Agora video engine:', error);
      }
    }
  }, [stopRingtone]);

  React.useEffect(() => {
    if (!config?.appId) {
      return;
    }

    const init = async () => {
      await setupVideoSDKEngine();
      setupEventHandler();
    };

    init();

    return cleanupAgoraEngine;
  }, [
    config?.appId,
    setupVideoSDKEngine,
    setupEventHandler,
    cleanupAgoraEngine,
  ]);

  React.useEffect(() => {
    const autoJoin = params?.autoJoin;
    if (!isIncoming && (autoJoin ?? true)) {
      if (
        config?.token &&
        config?.channel &&
        agoraEngineRef.current &&
        !isJoined
      ) {
        join(config.token, config.channel);
      }
    }
  }, [isIncoming, config?.token, config?.channel, params?.autoJoin, isJoined]);

  const join = async (token?: string, channel?: string) => {
    if (isJoined || !agoraEngineRef.current) {
      return;
    }

    try {
      const resolvedToken = token || config?.token;
      const resolvedChannel = channel || config?.channel;
      const resolvedUid = config?.uid ? parseInt(config.uid, 10) : 0;
      setLocalUid(resolvedUid);

      if (!resolvedToken || !resolvedChannel) {
        console.error('Missing call credentials');
        return;
      }

      setCallStatus('connecting');

      await agoraEngineRef.current.joinChannel(
        resolvedToken,
        resolvedChannel,
        resolvedUid,
        {
          channelProfile: ChannelProfileType.ChannelProfileCommunication,
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          publishCameraTrack: true,
          publishMicrophoneTrack: true,
          autoSubscribeAudio: true,
          autoSubscribeVideo: true,
        },
      );
    } catch (error) {
      console.error('Failed to join video channel:', error);
      setCallStatus('ringing');
    }
  };

  const leave = async () => {
    try {
      stopRingtone();
      if (agoraEngineRef.current && isJoined) {
        await agoraEngineRef.current.leaveChannel();
        setRemoteUid(null);
        setIsJoined(false);
        setCallStatus('ended');
      }
    } catch (error) {
      console.error('Failed to leave video channel:', error);
      setIsJoined(false);
      setCallStatus('ended');
    }
  };

  const onAccept = async () => {
    stopRingtone();
    if (config?.token && config?.channel && agoraEngineRef.current) {
      try {
        const resolvedUid = config?.uid ? parseInt(config.uid, 10) : 0;
        setLocalUid(resolvedUid);
        setCallStatus('connecting');

        await agoraEngineRef.current.joinChannel(
          config.token,
          config.channel,
          resolvedUid,
          {
            channelProfile: ChannelProfileType.ChannelProfileCommunication,
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            publishCameraTrack: true,
            publishMicrophoneTrack: true,
            autoSubscribeAudio: true,
            autoSubscribeVideo: true,
          },
        );
      } catch (error) {
        console.error('Failed to accept video call:', error);
      }
    }
  };

  const onDecline = () => {
    stopRingtone();
    navigation?.goBack();
  };

  const onEnd = () => {
    stopRingtone();
    leave();
    navigation?.goBack();
  };

  const toggleMute = async () => {
    if (!agoraEngineRef.current) {
      return;
    }

    try {
      const next = !isAudioMuted;
      await agoraEngineRef.current.muteLocalAudioStream(next);
      setIsAudioMuted(next);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const toggleVideo = async () => {
    if (!agoraEngineRef.current) {
      return;
    }

    try {
      const next = !isVideoMuted;
      await agoraEngineRef.current.muteLocalVideoStream(next);
      setIsVideoMuted(next);
    } catch (error) {
      console.error('Failed to toggle video:', error);
    }
  };

  const switchCamera = async () => {
    if (!agoraEngineRef.current) {
      return;
    }

    try {
      await agoraEngineRef.current.switchCamera();
      setIsFrontCamera(prev => !prev);
    } catch (error) {
      console.error('Failed to switch camera:', error);
    }
  };

  const renderRemoteVideo = () => {
    if (remoteUid !== null) {
      return (
        <RtcSurfaceView
          style={StyleSheet.absoluteFill}
          canvas={{
            uid: remoteUid,
            renderMode: RenderModeType.RenderModeFit,
          }}
        />
      );
    }

    return (
      <View style={styles.placeholder}>
        <CustomAvatar
          showBadge={false}
          avatarSize={180}
          data={{image: peerAvatar || Assets.Worker1}}
        />
        <Typography
          fontWeight="italics"
          size="md"
          fontType="Figtree"
          color="lightGreen">
          {callStatus === 'ringing' &&
            (isIncoming ? 'Incoming video call…' : 'Calling…')}
          {callStatus === 'connecting' && 'Connecting…'}
          {callStatus === 'in-call' && 'Waiting for video…'}
          {callStatus === 'ended' && 'Call ended'}
        </Typography>
      </View>
    );
  };

  const renderLocalPreview = () => {
    if (isVideoMuted) {
      return (
        <View style={[styles.localOverlay, styles.placeholderSmall]}>
          <Typography size="sm" color="white">
            Camera off
          </Typography>
        </View>
      );
    }

    return (
      <RtcSurfaceView
        style={styles.localOverlay}
        canvas={{
          uid: localUid,
          renderMode: RenderModeType.RenderModeFit,
        }}
        zOrderMediaOverlay
      />
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.remoteContainer}>{renderRemoteVideo()}</View>

      <View style={styles.localContainer}>{renderLocalPreview()}</View>

      {callStatus === 'ringing' && isIncoming && (
        <Container
          position="absolute"
          bottom={90}
          width={'full'}
          flexDirection="row"
          justifyContent="space-evenly">
          <OutlineButton title="Decline" onPress={onDecline} />
          <MainButton title="Accept" onPress={onAccept} />
        </Container>
      )}

      <Container
        position="absolute"
        bottom={40}
        width={'full'}
        flexDirection="row"
        justifyContent="center"
        gap={20}>
        <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
          <Icon
            name={isAudioMuted ? 'audio' : 'sound'}
            color={'white'}
            size={18}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleVideo} style={styles.controlButton}>
          <Icon
            name={isVideoMuted ? 'videocamera' : 'videocamera'}
            color={'white'}
            size={18}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={switchCamera} style={styles.controlButton}>
          <Icon name="retweet" color={'white'} size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onEnd}
          style={[styles.controlButton, styles.endButton]}>
          <Icon name="close" color={'white'} size={18} />
        </TouchableOpacity>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  remoteContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  localContainer: {
    position: 'absolute',
    right: 20,
    top: 80,
    width: scale(120),
    height: verticalScale(160),
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  localOverlay: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    gap: 16,
  },
  placeholderSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2937',
  },
  controlButton: {
    height: verticalScale(50),
    width: scale(50),
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endButton: {
    backgroundColor: '#F0443A',
  },
  hangupFloating: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    height: verticalScale(50),
    width: scale(50),
    borderRadius: 100,
    backgroundColor: '#F0443A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoCall;
