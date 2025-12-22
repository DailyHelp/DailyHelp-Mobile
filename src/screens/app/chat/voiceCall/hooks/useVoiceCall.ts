import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Platform, Vibration } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  IRtcEngineEventHandler,
  RtcConnection,
} from 'react-native-agora';
import { websocketService } from '../../../../../shared/services/WebSocket';
import chatService from '../../services/Chat.service';
import { useVoiceCallRingtone } from './useVoiceCallRingtone';



export const useVoiceCall = ({
  conversationUuid,
  isIncoming,
  routeParams,
  navigation,
  getPermission,
  handleGoBack,
  hasVibratePermission,
}: UseVoiceCallParams) => {
  const {config} = chatService.useAgoraToken(conversationUuid!);
  const agoraEngineRef = React.useRef<IRtcEngine | null>(null);
  const [isJoined, setIsJoined] = React.useState(false);
  const [isEngineReady, setIsEngineReady] = React.useState(false);
  const eventHandler = React.useRef<IRtcEngineEventHandler | null>(null);
  const [callStatus, setCallStatus] = React.useState<CallStatus>('ringing');
  const [isSpeakerOn, setIsSpeakerOn] = React.useState(false);
  const joinTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Use ringtone hook to manage vibrations
  useVoiceCallRingtone({
    isIncoming,
    callStatus,
    hasVibratePermission,
  });

  const stopRingtone = React.useCallback(() => {
    try {
      Vibration.cancel();
    } catch (error) {
      console.warn('Vibration cancel failed:', error);
    }
  }, []);

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
          if (navigation?.canGoBack()) {
            navigation.goBack();
          } else {
            navigation?.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Chat'}],
              }),
            );
          }
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

    return () => {
      cleanupAgoraEngine();
    };
  }, [config?.appId, setupVoiceSDKEngine, setupEventHandler]);

  const cleanupAgoraEngine = () => {
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
        agoraEngineRef.current.release();
        agoraEngineRef.current = null;
      } catch (e) {
        console.error('Error cleaning up Agora engine:', e);
      }
    }
  };

  const join = React.useCallback(
    async (token?: string, channel?: string) => {
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

        if (!resolvedToken || !resolvedChannel) {
          console.error('Missing call credentials');
          setCallStatus('ringing');
          return;
        }

        setCallStatus('connecting');
        console.log('Attempting to join channel:', resolvedChannel);

        joinTimeoutRef.current = setTimeout(() => {
          console.warn('Join channel timeout - resetting to ringing state');
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
            publishMicrophoneTrack: true,
            autoSubscribeAudio: true,
          },
        );
      } catch (e) {
        console.error('Failed to join channel:', e);

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
        setIsJoined(false);
        setCallStatus('ended');
      }
    } catch (e) {
      console.error('Failed to leave channel:', e);
      setIsJoined(false);
      setCallStatus('ended');
    }
  }, [isJoined, stopRingtone]);

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
        console.log('Auto-joining channel with engine ready');
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

  // Emit call:incoming:trigger when callStatus becomes 'connecting'
  React.useEffect(() => {
    if (callStatus === 'connecting' && websocketService.isConnected()) {
      const channel = config?.channel || routeParams?.channelName;
      const token = config?.token || routeParams?.token;

      if (conversationUuid && channel && token) {
        websocketService.send({
          type: 'call:incoming:trigger',
          data: {
            conversationUuid,
            channel,
            token,
            callType: 'voice',
            fromName: routeParams?.peerName,
            peerAvatar: routeParams?.peerAvatar,
          },
        });
        console.log(
          'Emitted call:incoming:trigger for conversation:',
          conversationUuid,
        );
      }
    }
  }, [
    callStatus,
    conversationUuid,
    config?.channel,
    config?.token,
    routeParams?.channelName,
    routeParams?.token,
    routeParams?.peerName,
    routeParams?.peerAvatar,
  ]);

  const onAccept = React.useCallback(async () => {
    stopRingtone();
    if (
      routeParams?.token &&
      routeParams?.channelName &&
      agoraEngineRef.current &&
      isEngineReady
    ) {
      try {
        await join(routeParams.token, routeParams.channelName);
      } catch (e) {
        console.error('Failed to accept call:', e);
        setCallStatus('ringing');
      }
    } else {
      console.warn('Cannot accept call: engine not ready or missing config');
    }
  }, [routeParams, isEngineReady, join, stopRingtone]);

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
    isSpeakerOn,
    join,
    leave,
    toggleSpeaker,
    onAccept,
    onDecline,
    onEnd,
  };
};
