import React from 'react';
import {View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  FlatList,
  SheetProps,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomAvatar from '../../../../../components/CustomAvatar';
import StatusChip from '../../../../../components/StatusChip';
import Typography from '../../../../../components/Typography';
import MainButton from '../../../../../components/button/MainButton';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import ProvidersDto from '../../home/dto/providersDto';
import jobService from '../service/Jobs.service';

const WorkerSuggestions = React.forwardRef<
  ActionSheetRef,
  SheetProps<'WorkerSuggestion'>
>((props, ref) => {
  const {data, isLoading} = jobService.useAlternateProviders(
    props.payload?.uuid!,
  );

  const renderItem = React.useCallback((item: ProvidersDto, index: number) => {
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
            <CustomAvatar data={{image: item.picture, badge: item.tier}} />
            <View style={{flexDirection: 'column', gap: 5, width: '83%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Typography fontWeight="bold" size="m2d">
                  {item.lastname} {item.firstname}
                </Typography>

                <View style={{flexDirection: 'row', gap: 3}}>
                  <Icon name="star" size={15} color={'#FFD100'} />
                  <Typography
                    fontWeight="regular"
                    color="gray"
                    textAlign="center">
                    {item.avgRating}
                  </Typography>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                }}>
                <Typography fontWeight="medium" color="gray">
                  {item.primaryJobRole}
                </Typography>
                <Typography fontWeight="bold" color="gray">
                  |
                </Typography>
                <Typography fontWeight="regular" color="gray">
                  From
                </Typography>
                <Typography fontWeight="bold" currency>
                  {item.offerStartingPrice}
                </Typography>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', gap: 10}}>
          <StatusChip>{item.engaged ? 'Available' : 'UnAvailable'}</StatusChip>
          <StatusChip backgroundColor="#F3F4F6">
            {item.completedJobs} jobs completed
          </StatusChip>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <MainButton
            enableButtonColor="lightGrey"
            onPress={() => {
              props?.payload?.navigation?.navigate('ServiceProfile', item);
            }}
            color="black"
            width={'48%'}>
            View profile
          </MainButton>
          <MainButton width={'48%'}>Send offers</MainButton>
        </View>
      </View>
    );
  }, []);

  return (
    <ActionSheet
      ref={ref}
      gestureEnabled
      overlayColor="black"
      defaultOverlayOpacity={0.5}>
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
          <Typography color="gray" textAlign="center">
            Here are a few other pros that can help.
          </Typography>
        </View>

        {/* FlatList */}
        <FlatList
          data={data}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString() + item.uuid}
          contentContainerStyle={{
            paddingBottom: verticalScale(100),
          }}
        />
      </View>
    </ActionSheet>
  );
});
export default WorkerSuggestions;
