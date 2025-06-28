import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {List} from 'react-native-paper';
import {PermissionsAndroid, Platform} from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Assets from '../../../../../assets/Assets';
import CustomInput from '../../../../../components/customInput/Index';
import Typography from '../../../../../components/Typography';
import {verticalScale} from '../../../../../shared/Scaling';
import Geolocation from '@react-native-community/geolocation';
import homeService from '../services/Home.service';
import utils from '../../../../../shared/Utils';
const savedLocations = [
  '88 Ilaje road, yaba, Lagos',
  '12 Adebayo street, Lekki-Ajah, Lagos',
];

const HomeAddress = React.forwardRef((props, ref) => {
  const [search, setSearch] = useState('');

  const {handleUseCurrentLocation} = homeService.useSaveLocation();

  const getLocation = () => {
    handleUseCurrentLocation((formattedAddress) => {
      SheetManager.hide('HomeAddress', {
        payload: {formatted_address: formattedAddress},
      });
    });
  };

  return (
    <ActionSheet
      ref={ref as any}
      closeOnPressBack={false}
      gestureEnabled={true}
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
          <Typography fontWeight="bold" size="md" color="#121921">
            Home Address
          </Typography>
        </View>

        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'column'}}>
            {/* Search bar */}
            <CustomInput placeholder="Search location" />

            {/* Use current location */}
            <List.Item
              title="Use current location"
              left={() => (
                <Assets.CurrentLocation style={{marginTop: verticalScale(7)}} />
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
          </View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
});

export default HomeAddress;
