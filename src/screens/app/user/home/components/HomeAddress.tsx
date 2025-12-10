import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {List} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Assets from '../../../../../assets/Assets';
import CustomInput from '../../../../../components/customInput/Index';
import Typography from '../../../../../components/Typography';
import {verticalScale} from '../../../../../shared/Scaling';
import homeService from '../services/Home.service';

const HomeAddress = React.forwardRef<
  ActionSheetRef<'HomeAddress'>,
  SheetProps<'HomeAddress'>
>((props, ref) => {
  const [search, setSearch] = React.useState('');

  const {currentLocation, locations} = homeService.useLocation(search);
  const {data, setAsDefault} = homeService.useSavedLocation();

  const getLocation = async () => {
    try {
      if (typeof currentLocation === 'function') {
        await currentLocation((address, metadata) => {
          SheetManager.hide('HomeAddress', {
            payload: {
              address: address || metadata?.address || metadata?.description,
              formatted_address: address || metadata?.description,
              ...metadata,
            },
          });
        });
      } else {
        console.error('currentLocation is not a function:', currentLocation);
      }
    } catch (error) {
      console.error('Error in getLocation:', error);
    }
  };

  return (
    <ActionSheet
      ref={ref}
      id="HomeAddress"
      closeOnPressBack={false}
      gestureEnabled={true}
      overlayColor="black"
      initialSnapIndex={0}
      backgroundInteractionEnabled={true}
      closable={true}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <View
        style={{
          padding: 16,
          height: verticalScale(700),
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <TouchableOpacity onPress={() => SheetManager.hide('HomeAddress')}>
            <Icon2 color={'#757C91'} name={'close'} size={16} />
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md" color="gray">
            {props.payload?.label || 'Home Address'}
          </Typography>
        </View>

        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'column'}}>
            {/* Search bar */}
            <CustomInput
              placeholder="Search location"
              onChangeText={setSearch}
            />

            {/* Use current location */}
            <List.Item
              title="Use current location"
              left={() => (
                <Assets.CurrentLocation style={{marginTop: verticalScale(7)}} />
              )}
              titleStyle={{color: '#3CBF4E', fontWeight: '600'}}
              onPress={getLocation}
            />

            {props.payload?.showCurrent && (
              <React.Fragment>
                {/* Saved locations */}
                {data?.slice(0, 3)?.map((address, idx) => (
                  <List.Item
                    key={address.uuid || idx}
                    title={address.address || address.description}
                    left={() => <Assets.SearchResult />}
                    onPress={() => {
                      let location = address.address;
                      if (!location) location = address.description!;

                      setAsDefault(address.uuid!, {
                        onSuccess: () => SheetManager.hide('HomeAddress'),
                      });
                    }}
                  />
                ))}
              </React.Fragment>
            )}

            {/* Searched locations */}
            {locations?.map((address, idx) => (
              <List.Item
                key={idx}
                title={address.address}
                left={() => <Assets.SearchResult />}
                onPress={() => {
                  SheetManager.hide('HomeAddress', {payload: address});
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
});

export default HomeAddress;
