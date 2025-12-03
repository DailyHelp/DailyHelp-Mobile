import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import {IVoiceCall} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import CustomAvatar from '../../../components/CustomAvatar';
import Typography from '../../../components/Typography';
import {scale, verticalScale} from '../../../shared/Scaling';
import React from 'react';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
} from 'react-native-agora';
import MainButton from '../../../components/button/MainButton';
import OutlineButton from '../../../components/button/OutlineButton';
import Container from '../../../components/container/Index';
import homeService from '../user/home/services/Home.service';
import chatService from './services/Chat.service';

type VoiceCallParams = {
  token?: string;
  channelName?: string;
  peerName?: string;
  peerAvatar?: string;
  isIncoming?: boolean;
  autoJoin?: boolean;
};

const VoiceCall: IVoiceCall = ({navigation, route}) => {
  const user = homeService.useUser();
  const {config} = chatService.useAgoraToken(route.params?.conversationUuid!);
  const agoraEngineRef = React.useRef<IRtcEngine | null>(null);
  const [isJoined, setIsJoined] = React.useState(false);
  const eventHandler = React.useRef<IRtcEngineEventHandler | null>(null);
  const [callStatus, setCallStatus] = React.useState<
    'idle' | 'ringing' | 'connecting' | 'in-call' | 'ended'
  >('ringing');
  const [isSpeakerOn, setIsSpeakerOn] = React.useState(false);
  const params = (route?.params || {}) as Partial<VoiceCallParams>;
  const [isIncoming] = React.useState<boolean>(Boolean(params?.isIncoming));

  const [peerAvatar] = React.useState<string | undefined>(params?.peerAvatar);

  const isMountedRef = React.useRef(false);

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

  const setupEventHandler = React.useCallback(() => {
    if (!agoraEngineRef.current) return;

    eventHandler.current = {
      onJoinChannelSuccess: (_connection: RtcConnection, elapsed: number) => {
        setIsJoined(true);
        setCallStatus('in-call');

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

        if (isJoined) {
          stopRingtone();
          setCallStatus('ended');
          setTimeout(() => {
            navigation?.goBack();
          }, 1000);
        }
      },
      onError: (err: number, msg: string) => {
        console.error('Agora error:', err, msg);
        stopRingtone();
        setCallStatus('ended');
      },
      onLeaveChannel: (_connection: RtcConnection, stats: any) => {
        setIsJoined(false);
        stopRingtone();
        setCallStatus('ended');
      },
    };
    agoraEngineRef.current.registerEventHandler(eventHandler.current);
  }, [config?.channel, isJoined, navigation]);

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
  }, [config?.appId]);

  const [hasVibratePermission, setHasVibratePermission] = React.useState(false);

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

  React.useEffect(() => {
    if (!config?.appId) {
      return;
    }

    const init = async () => {
      await setupVoiceSDKEngine();
      setupEventHandler();
    };
    init();

    return cleanupAgoraEngine;
  }, [config?.appId, setupVoiceSDKEngine, setupEventHandler]);

  const ringtoneIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

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
      if (
        config?.token &&
        config?.channel &&
        agoraEngineRef.current &&
        !isJoined
      ) {
        join(config.token, config.channel);
      }
    }
  }, [isIncoming, config?.token, config?.channel, params?.autoJoin]);

  const join = async (token?: string, channel?: string) => {
    if (isJoined || !agoraEngineRef.current) {
      return;
    }

    try {
      const resolvedToken = token || config?.token;
      const resolvedChannel = channel || config?.channel;
      const resolvedUid = config?.uid ? parseInt(config.uid, 10) : 0;

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
          publishMicrophoneTrack: true,
          autoSubscribeAudio: true,
        },
      );
    } catch (e) {
      console.error('Failed to join channel:', e);
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
    if (agoraEngineRef.current) {
      try {
        agoraEngineRef.current.unregisterEventHandler(eventHandler.current!);
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
    if (config?.token && config?.channel && agoraEngineRef.current) {
      try {
        const resolvedUid = config?.uid ? parseInt(config.uid, 10) : 0;
        setCallStatus('connecting');

        await agoraEngineRef.current.joinChannel(
          config.token,
          config.channel,
          resolvedUid,
          {
            channelProfile: ChannelProfileType.ChannelProfileCommunication,
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            publishMicrophoneTrack: true,
            autoSubscribeAudio: true,
          },
        );
      } catch (e) {
        console.error('Failed to accept call:', e);
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
          data={{image: peerAvatar || Assets.Worker1}}
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
