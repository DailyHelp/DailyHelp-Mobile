import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  ScrollView,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';

const ChatDisclaimer = React.forwardRef<
  ActionSheetRef<'ChatDisclaimer'>,
  SheetProps<'ChatDisclaimer'>
>((props, ref) => {
  const handleAgree = () => {
    if (props.payload?.onAgree) {
      props.payload.onAgree();
    }
    SheetManager.hide('ChatDisclaimer');
  };

  return (
    <ActionSheet
      ref={ref}
      id="ChatDisclaimer"
      closeOnPressBack={true}
      gestureEnabled={true}
      backgroundInteractionEnabled={true}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: 'white',
      }}
      initialSnapIndex={0}
      overlayColor="black"
      defaultOverlayOpacity={0.5}>
      <View
        style={{
          padding: scale(16),
          paddingTop: verticalScale(20),
          backgroundColor: 'white',
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: verticalScale(20),
          }}>
          <Typography fontWeight="bold" size="md">
            Safety & Communication Policy
          </Typography>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => SheetManager.hide('ChatDisclaimer')}
              style={{
                padding: scale(4),
              }}>
              <Icon name="close" color={'#757C91'} size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={{
            maxHeight: verticalScale(500),
            marginBottom: verticalScale(20),
          }}
          showsVerticalScrollIndicator={true}>
          <View style={{gap: verticalScale(16)}}>
            <Typography size="md">
              To maintain a safe and trustworthy experience on DailyHelp, all
              communication between users and service providers — including text
              messages, voice calls, and video calls — may be monitored or
              recorded for quality assurance, dispute resolution, and safety
              purposes.
            </Typography>

            <Typography size="md">
              By using the chat or initiating a call, you agree to allow
              DailyHelp to track these interactions in line with our Terms of
              Use and Privacy Policy. We do not interfere with private matters,
              but in the event of a complaint, the content of chats and call
              logs may be reviewed by our support team to resolve the issue.
            </Typography>

            <Typography size="md">
              Please ensure all agreements made within chats or contracts are
              clear and respectful.
            </Typography>

            <Typography size="md">
              Do not send or accept links in chats or calls.
            </Typography>

            <Typography size="md">
              For your safety, please do not share your phone number, email
              address, links or any personal contact info in chats or calls. All
              communication and transactions should stay within the app.
            </Typography>

            <Typography size="md">
              Abuse of the platform may lead to account restrictions or removal.
            </Typography>

            <Typography size="md">
              We're here to help ensure all connections on DailyHelp are secure,
              respectful, and professional.
            </Typography>
          </View>
        </ScrollView>

        {/* Action Button */}
        <Container marginTop={verticalScale(10)}>
          <MainButton
            onPress={handleAgree}
            enableButtonColor="primary"
            color="black"
            width="full"
            borderRadius={10}
            height={verticalScale(50)}>
            Agree and Continue
          </MainButton>
        </Container>
      </View>
    </ActionSheet>
  );
});

export default ChatDisclaimer;


