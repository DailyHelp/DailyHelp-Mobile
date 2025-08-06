import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import CustomAvatar from '../../../../components/CustomAvatar';
import Offer from '../../../../components/offers/Index';
import Typography from '../../../../components/Typography';
import {verticalScale} from '../../../../shared/Scaling';
import utils from '../../../../shared/Utils';
import {IViewDetails} from '../../../../@types/routes';

const JobDetails: IViewDetails = ({navigation, route}) => {
  const [visible, setVisible] = React.useState(false);
  utils.useHideBottomTab(navigation);

  return (
    <Container width={'full'}>
      <Container
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        flexDirection="column"
        width={'full'}>
        <Container
          backgroundColor="orange"
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          flexDirection="column"
          paddingVertical={5}
          width={'full'}>
          <Typography color="white" textAlign="center" fontWeight="medium">
            Waiting to start
          </Typography>
        </Container>

        <Container
          height={'full'}
          width={'full'}
          type="scroll"
          flexDirection="column"
          gap={10}>
          <Container
            backgroundColor="white"
            borderRadius={20}
            alignItems="center"
            flexDirection="column"
            padding={25}
            paddingBottom={15}
            gap={9}>
            <CustomAvatar
              data={{image: Assets.WorkerAvatar1}}
              avatarSize={50}
              showBadge={false}
            />
            <Typography
              color="black"
              textAlign="center"
              fontWeight="bold"
              size="md">
              Jane Doe
            </Typography>

            <Container
              padding={10}
              borderRadius={30}
              borderStyle="dotted"
              borderWidth={1}
              flexDirection="row"
              gap={7}
              borderColor="lighterGreen">
              <Assets.Info />
              <Typography color="green2">
                Remind the client to start once you arrive.
              </Typography>
            </Container>
          </Container>

          <Container
            backgroundColor="white"
            borderRadius={20}
            alignItems="center"
            flexDirection="column"
            padding={25}
            paddingBottom={15}
            gap={30}>
            <Container gap={10}>
              <Typography
                fontWeight="bold"
                size="lg"
                textAlign="center"
                currency>
                32000
              </Typography>

              <Container flexDirection="row" gap={5} alignItems="center">
                <Assets.Accepted />
                <Typography color="lightBlack" fontWeight="regular" size="sm">
                  Accepted on 23 Mar, 2025, 09:30
                </Typography>
              </Container>
            </Container>

            <Container
              flexDirection="row"
              gap={10}
              borderBottomWidth={1}
              borderStyle="dashed"
              borderColor="lightDeepGrey"
              paddingBottom={20}>
              <MainButton
                onPress={() => setVisible(true)}
                enableButtonColor="lightGrey"
                color="black"
                width={'45%'}
                icon={() => (
                  <Icon
                    name="close"
                    color={'#757C91'}
                    size={20}
                    style={{
                      marginTop: verticalScale(5),
                    }}
                  />
                )}>
                Cancel job
              </MainButton>
              <MainButton
                enableButtonColor="lightGrey"
                color="black"
                width={'45%'}
                icon={() => <Assets.SendOffer />}>
                Chat
              </MainButton>
            </Container>

            <Container>
              <Typography lineHeight={25} size="md" color="lightBlack">
                Hey! I need help cleaning my room. It’s mostly just sweeping,
                mopping, wiping down surfaces, and helping me organize a few
                things. Nothing too heavy, but I’d love it to look fresh and
                neat again.
              </Typography>
            </Container>
          </Container>
        </Container>
      </Container>

      <Offer
        type="cancel"
        isVisible={visible}
        onClose={() => setVisible(false)}
      />
    </Container>
  );
};
export default JobDetails;
