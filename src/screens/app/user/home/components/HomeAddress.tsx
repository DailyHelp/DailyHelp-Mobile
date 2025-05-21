import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {List} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Assets from '../../../../../assets/Assets';
import CustomInput from '../../../../../components/customInput/Index';
import {verticalScale} from '../../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';

const savedLocations = [
  '88 Ilaje road, yaba, Lagos',
  '12 Adebayo street, Lekki-Ajah, Lagos',
];

const HomeAddress = React.forwardRef((props, ref) => {
  const [search, setSearch] = useState('');

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
          <Text
            style={{
              fontFamily: fonts.GeistBold,
              color: '#121921',
              fontSize: customFontSize.md,
            }}>
            Home Address
          </Text>
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
              onPress={() => {
                // implement geolocation logic here
              }}
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
