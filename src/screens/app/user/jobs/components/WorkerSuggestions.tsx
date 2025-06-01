import React, { version } from 'react';
import {View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  FlatList,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import Assets from '../../../../../assets/Assets';
import CustomAvatar from '../../../../../components/CustomAvatar';
import StatusChip from '../../../../../components/StatusChip';
import Typography from '../../../../../components/Typography';
import MainButton from '../../../../../components/button/MainButton';
import {scale, verticalScale} from '../../../../../shared/Scaling';

const WorkerSuggestions = React.forwardRef<ActionSheetRef, IWorkerSuggestion>(
  (props, ref) => {
    const renderItem = React.useCallback((item: any, index: number) => {
      return (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#F1F2F4',
            borderRadius: 10,
            padding: scale(10),
            marginTop: scale(20),
            flexDirection: 'column',
            gap: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <CustomAvatar data={{image: Assets.Worker1}} />
              <View style={{flexDirection: 'column', gap: 5, width: '83%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Typography fontWeight="bold" size="m2d">
                    Ruth Taribo
                  </Typography>

                  <View style={{flexDirection: 'row', gap: 3}}>
                    <Icon name="star" size={15} color={'#FFD100'} />
                    <Typography
                      fontWeight="regular"
                      color="#757C91"
                      textAlign="center">
                      4.5
                    </Typography>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                  }}>
                  <Typography fontWeight="medium" color="#757C91">
                    Hair stylist
                  </Typography>
                  <Typography fontWeight="bold" color="#757C91">
                    |
                  </Typography>
                  <Typography fontWeight="regular" color="#757C91">
                    From
                  </Typography>
                  <Typography fontWeight="bold">₦45,000</Typography>
                </View>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <StatusChip>Available</StatusChip>
            <StatusChip backgroundColor="#F3F4F6">21 jobs completed</StatusChip>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <MainButton
              enableButtonColor="#F9F9FB"
              enableColor="#121921"
              width={'48%'}>
              View profile
            </MainButton>
            <MainButton width={'48%'}>Send offers</MainButton>
          </View>
        </View>
      );
    }, []);

    return (
      <ActionSheet ref={ref} gestureEnabled>
        <View style={{backgroundColor: 'white', padding: scale(10)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: scale(5),
            }}>
            <Icon name="close" color={'#757C91'} size={15} />
          </View>
          {/* Header */}
          <View
            style={{
              flexDirection: 'column',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: scale(20),
            }}>
            <Typography fontWeight="bold" size="lg">
              Looking for someone else?
            </Typography>
            <Typography color="#757C91" textAlign="center">
              Here are a few other pros that can help.
            </Typography>
          </View>

          {/* FlatList */}
          <FlatList
            data={['1', '2', '3', '4', '5']}
            renderItem={({item, index}) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom: verticalScale(100),
            }}
          />
        </View>
      </ActionSheet>
    );
  },
);
export default WorkerSuggestions;
