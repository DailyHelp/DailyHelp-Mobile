import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
} from 'react-native-agora';
import Icon from 'react-native-vector-icons/AntDesign';
import {IVoiceCall} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import MainButton from '../../../components/button/MainButton';
import OutlineButton from '../../../components/button/OutlineButton';
import Container from '../../../components/container/Index';
import CustomAvatar from '../../../components/CustomAvatar';
import Typography from '../../../components/Typography';
import {scale, verticalScale} from '../../../shared/Scaling';
import {websocketService} from '../../../shared/services/WebSocket';
import chatService from './services/Chat.service';

const VoiceCall: IVoiceCall = ({navigation, route}) => {
  const {config} = chatService.useAgoraToken(route.params?.conversationUuid!);
  const agoraEngineRef = React.useRef<IRtcEngine | null>(null);
  const [isJoined, setIsJoined] = React.useState(false);
  const [isEngineReady, setIsEngineReady] = React.useState(false);
  const eventHandler = React.useRef<IRtcEngineEventHandler | null>(null);
  const [callStatus, setCallStatus] = React.useState<CallStatus>('ringing');
  const [isSpeakerOn, setIsSpeakerOn] = React.useState(false);
  const params = route?.params as Partial<VoiceCallParams>;
  const [isIncoming] = React.useState<boolean>(Boolean(params?.isIncoming));
  const [hasVibratePermission, setHasVibratePermission] = React.useState(false);
  const [peerAvatar] = React.useState<string | undefined>(params?.peerAvatar);
  const isMountedRef = React.useRef(false);
  const joinTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const ringtoneIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

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

  const getPermission = React.useCallback(async () => {
    if (Platform.OS === 'android') {
      const results = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        'android.permission.VIBRATE' as any,
      ]);

      const vibratePermission = (results as any)['android.permission.VIBRATE'];
      setHasVibratePermission(
        vibratePermission === PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      setHasVibratePermission(true);
    }
  }, []);

  const stopRingtone = React.useCallback(() => {
    if (ringtoneIntervalRef.current) {
      clearInterval(ringtoneIntervalRef.current);
      ringtoneIntervalRef.current = null;
    }

    if (hasVibratePermission) {
      try {
        Vibration.cancel();
      } catch (error) {
        console.warn('Vibration cancel failed:', error);
      }
    }
  }, [hasVibratePermission]);

  const playRingtone = React.useCallback(() => {
    if (isIncoming && callStatus === 'ringing' && hasVibratePermission) {
      ringtoneIntervalRef.current = setInterval(() => {
        try {
          Vibration.vibrate(500);
        } catch (error) {
          console.warn('Vibration failed:', error);
        }
      }, 2000);
    }
  }, [isIncoming, callStatus, hasVibratePermission]);

  const setupEventHandler = React.useCallback(() => {
    if (!agoraEngineRef.current) return;

    // Unregister any existing handler first
    if (eventHandler.current) {
      agoraEngineRef.current.unregisterEventHandler(eventHandler.current);
    }

    // Clear any existing join timeout
    if (joinTimeoutRef.current) {
      clearTimeout(joinTimeoutRef.current);
      joinTimeoutRef.current = null;
    }

    eventHandler.current = {
      onJoinChannelSuccess: (_connection: RtcConnection, elapsed: number) => {
        console.log('Successfully joined channel, elapsed:', elapsed);
        setIsJoined(true);
        setCallStatus('in-call');

        // Clear join timeout on success
        if (joinTimeoutRef.current) {
          clearTimeout(joinTimeoutRef.current);
          joinTimeoutRef.current = null;
        }

        stopRingtone();
      },
      onUserJoined: (_connection: RtcConnection, uid: number) => {
        console.log('Remote user ' + uid + ' joined');
      },
      onUserOffline: (
        _connection: RtcConnection,
        uid: number,
        reason: number,
      ) => {
        console.log('Remote user ' + uid + ' left the channel');
        
        stopRingtone();
        setCallStatus('ended');
        setTimeout(() => {
          navigation?.goBack();
        }, 1000);
      },
      onError: (err: number, msg: string) => {
        console.error('Agora error:', err, msg);
        stopRingtone();

        // Clear join timeout on error
        if (joinTimeoutRef.current) {
          clearTimeout(joinTimeoutRef.current);
          joinTimeoutRef.current = null;
        }

        // Reset status so UI can recover from errors
        setCallStatus('ended');
      },
      onLeaveChannel: (_connection: RtcConnection, stats: any) => {
        setIsJoined(false);
        stopRingtone();
        setCallStatus('ended');
      },
    };
    agoraEngineRef.current.registerEventHandler(eventHandler.current);
    setIsEngineReady(true);
  }, [navigation, stopRingtone]);

  const setupVoiceSDKEngine = React.useCallback(async () => {
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

      agoraEngine.enableAudio();
    } catch (e) {
      console.error('Failed to setup Agora engine:', e);
      setCallStatus('ended');
    }
  }, [config?.appId, getPermission]);

  React.useEffect(() => {
    if (!config?.appId) {
      setIsEngineReady(false);
      return;
    }

    setIsEngineReady(false);

    const init = async () => {
      try {
        await setupVoiceSDKEngine();
        // Only setup event handler if engine was successfully created
        if (agoraEngineRef.current) {
          setupEventHandler();
        }
      } catch (error) {
        console.error('Failed to initialize Agora engine:', error);
        setIsEngineReady(false);
        setCallStatus('ended');
      }
    };
    init();

    return cleanupAgoraEngine;
  }, [config?.appId, setupVoiceSDKEngine, setupEventHandler]);

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

  React.useEffect(() => {
    const autoJoin = params?.autoJoin;
    if (!isIncoming && (autoJoin ?? true)) {
      // Wait for engine to be ready before attempting to join
      if (
        config?.token &&
        config?.channel &&
        agoraEngineRef.current &&
        isEngineReady &&
        !isJoined &&
        callStatus === 'ringing'
      ) {
        console.log('Auto-joining channel with engine ready');
        join(config.token, config.channel);
      }
    }
  }, [
    isIncoming,
    config?.token,
    config?.channel,
    params?.autoJoin,
    isEngineReady,
    isJoined,
    callStatus,
  ]);

  // Emit call:incoming:trigger when callStatus becomes 'connecting'
  React.useEffect(() => {
    if (callStatus === 'connecting' && websocketService.isConnected()) {
      const conversationUuid = route.params?.conversationUuid;
      const channel = config?.channel || route.params?.channelName;
      const token = config?.token || route.params?.token;
      
      if (conversationUuid && channel && token) {
        websocketService.send({
          type: 'call:incoming:trigger',
          data: {
            conversationUuid,
            channel,
            token,
            callType: 'voice',
            fromName: route.params?.peerName,
            peerAvatar: route.params?.peerAvatar,
          },
        });
        console.log('Emitted call:incoming:trigger for conversation:', conversationUuid);
      }
    }
  }, [
    callStatus,
    route.params?.conversationUuid,
    config?.channel,
    config?.token,
    route.params?.channelName,
    route.params?.token,
    route.params?.peerName,
    route.params?.peerAvatar,
  ]);

  const join = async (token?: string, channel?: string) => {
    if (isJoined || !agoraEngineRef.current || !isEngineReady) {
      console.warn(
        'Cannot join: isJoined=',
        isJoined,
        'engine=',
        !!agoraEngineRef.current,
        'ready=',
        isEngineReady,
      );
      return;
    }

    // Ensure event handler is registered before joining
    if (!eventHandler.current && agoraEngineRef.current) {
      setupEventHandler();
    }

    // Clear any existing timeout
    if (joinTimeoutRef.current) {
      clearTimeout(joinTimeoutRef.current);
      joinTimeoutRef.current = null;
    }

    try {
      const resolvedToken = token || config?.token;
      const resolvedChannel = channel || config?.channel;
      const resolvedUid = config?.uid ? parseInt(config.uid, 10) : 0;

      if (!resolvedToken || !resolvedChannel) {
        console.error('Missing call credentials');
        setCallStatus('ringing');
        return;
      }

      setCallStatus('connecting');
      console.log('Attempting to join channel:', resolvedChannel);

      // Set a timeout to prevent infinite connecting state
      joinTimeoutRef.current = setTimeout(() => {
        console.warn('Join channel timeout - resetting to ringing state');
        // Always reset back to ringing on timeout so user can retry/cancel
        setCallStatus('ringing');
        joinTimeoutRef.current = null;
      }, 15000); // 15 second timeout

      await agoraEngineRef.current.joinChannel(
        resolvedToken,
        resolvedChannel,
        resolvedUid,
        {
          channelProfile: ChannelProfileType.ChannelProfileCommunication,
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          publishMicrophoneTrack: true,
          autoSubscribeAudio: true,
        },
      );
    } catch (e) {
      console.error('Failed to join channel:', e);

      // Clear timeout on error
      if (joinTimeoutRef.current) {
        clearTimeout(joinTimeoutRef.current);
        joinTimeoutRef.current = null;
      }

      setCallStatus('ringing');
    }
  };

  const leave = async () => {
    try {
      stopRingtone();
      if (agoraEngineRef.current && isJoined) {
        await agoraEngineRef.current.leaveChannel();
        setIsJoined(false);
        setCallStatus('ended');
      }
    } catch (e) {
      console.error('Failed to leave channel:', e);
      setIsJoined(false);
      setCallStatus('ended');
    }
  };

  const cleanupAgoraEngine = () => {
    stopRingtone();

    // Clear join timeout
    if (joinTimeoutRef.current) {
      clearTimeout(joinTimeoutRef.current);
      joinTimeoutRef.current = null;
    }

    setIsEngineReady(false);

    if (agoraEngineRef.current) {
      try {
        if (eventHandler.current) {
          agoraEngineRef.current.unregisterEventHandler(eventHandler.current);
        }
        agoraEngineRef.current.leaveChannel();
        agoraEngineRef.current.release();
        agoraEngineRef.current = null;
      } catch (e) {
        console.error('Error cleaning up Agora engine:', e);
      }
    }
  };

  const toggleSpeaker = React.useCallback(async () => {
    if (agoraEngineRef.current) {
      try {
        await agoraEngineRef.current.setEnableSpeakerphone(!isSpeakerOn);
        setIsSpeakerOn(!isSpeakerOn);
      } catch (e) {
        console.error('Failed to toggle speaker:', e);
      }
    }
  }, [isSpeakerOn]);

  const onAccept = async () => {
    stopRingtone();
    if (
      route.params?.token &&
      route.params?.channelName &&
      agoraEngineRef.current &&
      isEngineReady
    ) {
      try {
        await join(route.params?.token, route.params?.channelName);
      } catch (e) {
        console.error('Failed to accept call:', e);
        setCallStatus('ringing');
      }
    } else {
      console.warn('Cannot accept call: engine not ready or missing config');
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

  return (
    <View style={{flex: 1}}>
      <Container
        flexDirection="column"
        gap={10}
        justifyContent="center"
        alignItems="center"
        height={verticalScale(500)}>
        <CustomAvatar
          showBadge={false}
          avatarSize={200}
          data={{image: peerAvatar}}
        />

        <Typography
          fontWeight="italics"
          size="md"
          fontType="Figtree"
          color="lightGreen">
          {callStatus === 'ringing' &&
            (isIncoming ? 'Incoming call…' : 'Calling…')}
          {callStatus === 'connecting' && 'Connecting…'}
          {callStatus === 'in-call' && 'In call'}
          {callStatus === 'ended' && 'Call ended'}
        </Typography>
      </Container>

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

      {callStatus === 'in-call' && (
        <Container
          position="absolute"
          bottom={90}
          width={'full'}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap={30}>
          <TouchableOpacity
            onPress={toggleSpeaker}
            style={{
              height: verticalScale(50),
              width: scale(50),
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isSpeakerOn ? '#017441' : '#E5E7EB',
              borderRadius: 100,
            }}>
            <Icon
              name="sound"
              color={isSpeakerOn ? 'white' : '#6B7280'}
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onEnd}
            style={{
              height: verticalScale(50),
              width: scale(50),
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F0443A',
              borderRadius: 100,
            }}>
            <Icon
              name="close"
              color={'white'}
              size={15}
              style={{marginTop: verticalScale(3)}}
            />
          </TouchableOpacity>
        </Container>
      )}

      {callStatus === 'ringing' && !isIncoming && (
        <TouchableOpacity
          onPress={onEnd}
          style={{
            height: verticalScale(50),
            width: scale(50),
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 70,
            backgroundColor: '#F0443A',
            borderRadius: 100,
            alignSelf: 'center',
          }}>
          <Icon
            name="close"
            color={'white'}
            size={15}
            style={{marginTop: verticalScale(3)}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default VoiceCall;
