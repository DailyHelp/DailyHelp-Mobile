import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {Platform} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
} from 'react-native-agora';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import chatService from '../../services/Chat.service';
import {useVideoCallRingtone} from './useVideoCallRingtone';
import { IChatRoute } from '../../../../../@types/routes';

interface UseVideoCallParams {
  conversationUuid?: string;
  isIncoming: boolean;
  routeParams?: Partial<VoiceCallParams>;
  navigation: NativeStackNavigationProp<IChatRoute, 'VideoCall'>;
  getPermission: () => Promise<void>;
  handleGoBack: () => void;
}

export const useVideoCall = ({
  conversationUuid,
  isIncoming,
  routeParams,
  navigation,
  getPermission,
  handleGoBack,
}: UseVideoCallParams) => {
  const {config} = chatService.useAgoraToken(conversationUuid!);
  const agoraEngineRef = React.useRef<IRtcEngine | null>(null);
  const eventHandler = React.useRef<IRtcEngineEventHandler | null>(null);
  const [isJoined, setIsJoined] = React.useState(false);
  const [isEngineReady, setIsEngineReady] = React.useState(false);
  const [callStatus, setCallStatus] = React.useState<CallStatus>('ringing');
  const [remoteUid, setRemoteUid] = React.useState<number | null>(null);
  const [localUid, setLocalUid] = React.useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = React.useState(false);
  const [isVideoMuted, setIsVideoMuted] = React.useState(false);
  const [isFrontCamera, setIsFrontCamera] = React.useState(true);
  const joinTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Use ringtone hook to manage ringtone (no-op for video calls)
  useVideoCallRingtone({
    isIncoming,
    callStatus,
  });

  const stopRingtone = React.useCallback(() => {
    // No vibration to cancel for video calls
  }, []);

  const setupEventHandler = React.useCallback(() => {
    if (!agoraEngineRef.current) return;

    if (eventHandler.current) {
      agoraEngineRef.current.unregisterEventHandler(eventHandler.current);
    }

    if (joinTimeoutRef.current) {
      clearTimeout(joinTimeoutRef.current);
      joinTimeoutRef.current = null;
    }

    eventHandler.current = {
      onJoinChannelSuccess: (_connection: RtcConnection, elapsed: number) => {
        console.log('Successfully joined video channel, elapsed:', elapsed);
        setIsJoined(true);
        setCallStatus('in-call');

        if (joinTimeoutRef.current) {
          clearTimeout(joinTimeoutRef.current);
          joinTimeoutRef.current = null;
        }

        stopRingtone();
      },
      onUserJoined: (_connection: RtcConnection, uid: number) => {
        console.log('Remote user ' + uid + ' joined video channel');
        setRemoteUid(uid);
      },
      onUserOffline: (
        _connection: RtcConnection,
        uid: number,
        reason: number,
      ) => {
        console.log('Remote user ' + uid + ' left the video channel');
        if (remoteUid === uid) {
          setRemoteUid(null);
        }
        stopRingtone();
        setCallStatus('ended');
        setTimeout(() => {
          navigation?.goBack();
        }, 1000);
      },
      onError: (err: number, msg: string) => {
        console.error('Agora error:', err, msg);
        stopRingtone();

        if (joinTimeoutRef.current) {
          clearTimeout(joinTimeoutRef.current);
          joinTimeoutRef.current = null;
        }

        setCallStatus('ended');
      },
      onLeaveChannel: (_connection: RtcConnection, stats: any) => {
        setIsJoined(false);
        setRemoteUid(null);
        stopRingtone();
        setCallStatus('ended');
      },
    };
    agoraEngineRef.current.registerEventHandler(eventHandler.current);
    setIsEngineReady(true);
  }, [navigation, stopRingtone, remoteUid]);

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
      setIsEngineReady(false);
      setCallStatus('ended');
    }
  }, [config?.appId, getPermission]);

  const cleanupAgoraEngine = React.useCallback(() => {
    stopRingtone();

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
      setIsEngineReady(false);
      return;
    }

    setIsEngineReady(false);

    const init = async () => {
      try {
        await setupVideoSDKEngine();
        if (agoraEngineRef.current) {
          setupEventHandler();
        }
      } catch (error) {
        console.error('Failed to initialize Agora video engine:', error);
        setIsEngineReady(false);
        setCallStatus('ended');
      }
    };
    init();

    return cleanupAgoraEngine;
  }, [config?.appId, setupVideoSDKEngine, setupEventHandler, cleanupAgoraEngine]);

  const join = React.useCallback(
    async (token?: string, channel?: string) => {
      if (isJoined || !agoraEngineRef.current || !isEngineReady) {
        console.warn(
          'Cannot join video: isJoined=',
          isJoined,
          'engine=',
          !!agoraEngineRef.current,
          'ready=',
          isEngineReady,
        );
        return;
      }

      if (!eventHandler.current && agoraEngineRef.current) {
        setupEventHandler();
      }

      if (joinTimeoutRef.current) {
        clearTimeout(joinTimeoutRef.current);
        joinTimeoutRef.current = null;
      }

      try {
        const resolvedToken = token || config?.token;
        const resolvedChannel = channel || config?.channel;
        const resolvedUid = config?.uid ? parseInt(config.uid, 10) : 0;
        setLocalUid(resolvedUid);

        if (!resolvedToken || !resolvedChannel) {
          console.error('Missing video call credentials');
          setCallStatus('ringing');
          return;
        }

        setCallStatus('connecting');
        console.log('Attempting to join video channel:', resolvedChannel);

        joinTimeoutRef.current = setTimeout(() => {
          console.warn('Join video channel timeout - resetting to ringing state');
          setCallStatus('ringing');
          joinTimeoutRef.current = null;
        }, 15000);

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

        if (joinTimeoutRef.current) {
          clearTimeout(joinTimeoutRef.current);
          joinTimeoutRef.current = null;
        }

        setCallStatus('ringing');
      }
    },
    [isJoined, isEngineReady, config, setupEventHandler],
  );

  const leave = React.useCallback(async () => {
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
  }, [isJoined, stopRingtone]);

  const toggleMute = React.useCallback(async () => {
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
  }, [isAudioMuted]);

  const toggleVideo = React.useCallback(async () => {
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
  }, [isVideoMuted]);

  const switchCamera = React.useCallback(async () => {
    if (!agoraEngineRef.current) {
      return;
    }

    try {
      await agoraEngineRef.current.switchCamera();
      setIsFrontCamera(prev => !prev);
    } catch (error) {
      console.error('Failed to switch camera:', error);
    }
  }, []);

  // Auto-join for outgoing calls
  React.useEffect(() => {
    const autoJoin = routeParams?.autoJoin;
    if (!isIncoming && (autoJoin ?? true)) {
      if (
        config?.token &&
        config?.channel &&
        agoraEngineRef.current &&
        isEngineReady &&
        !isJoined &&
        callStatus === 'ringing'
      ) {
        console.log('Auto-joining video channel with engine ready');
        join(config.token, config.channel);
      }
    }
  }, [
    isIncoming,
    config?.token,
    config?.channel,
    routeParams?.autoJoin,
    isEngineReady,
    isJoined,
    callStatus,
    join,
  ]);

  const onAccept = React.useCallback(async () => {
    stopRingtone();
    if (
      (routeParams?.token || config?.token) &&
      (routeParams?.channelName || config?.channel) &&
      agoraEngineRef.current &&
      isEngineReady
    ) {
      try {
        await join(
          routeParams?.token || config?.token,
          routeParams?.channelName || config?.channel,
        );
      } catch (e) {
        console.error('Failed to accept video call:', e);
        setCallStatus('ringing');
      }
    } else {
      console.warn(
        'Cannot accept video call: engine not ready or missing config',
      );
    }
  }, [routeParams, config, isEngineReady, join, stopRingtone]);

  const onDecline = React.useCallback(() => {
    stopRingtone();
    handleGoBack();
  }, [stopRingtone, handleGoBack]);

  const onEnd = React.useCallback(() => {
    stopRingtone();
    leave();
    handleGoBack();
  }, [stopRingtone, leave, handleGoBack]);

  return {
    callStatus,
    isJoined,
    isEngineReady,
    remoteUid,
    localUid,
    isAudioMuted,
    isVideoMuted,
    isFrontCamera,
    join,
    leave,
    toggleMute,
    toggleVideo,
    switchCamera,
    onAccept,
    onDecline,
    onEnd,
  };
};


