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

const savedLocations = [
  '88 Ilaje road, yaba, Lagos',
  '12 Adebayo street, Lekki-Ajah, Lagos',
];

const HomeAddress = React.forwardRef<
  ActionSheetRef<'HomeAddress'>,
  SheetProps<'HomeAddress'>
>((props, ref) => {
  const [search, setSearch] = React.useState('');

  const {currentLocation, locations} = homeService.useLocation(search);

  const getLocation = () => {
    try {
      if (typeof currentLocation === 'function') {
        currentLocation((address, metadata) => {
          SheetManager.hide('HomeAddress', {
            payload: {address: address, ...metadata},
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
      closeOnPressBack={false}
      gestureEnabled={true}
      backgroundInteractionEnabled={true}
      closable={true}
      initialSnapIndex={0}
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
          <TouchableOpacity>
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

            {props.payload?.showCurrent && (
              <React.Fragment>
                {/* Use current location */}
                <List.Item
                  title="Use current location"
                  left={() => (
                    <Assets.CurrentLocation
                      style={{marginTop: verticalScale(7)}}
                    />
                  )}
                  titleStyle={{color: '#3CBF4E', fontWeight: '600'}}
                  onPress={getLocation}
                />

                {/* Saved locations */}
                {savedLocations.map((address, idx) => (
                  <List.Item
                    key={idx}
                    title={address}
                    left={() => <Assets.SearchResult />}
                    onPress={() => {
                      // handle selection
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
