import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import {verticalScale} from '../../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';

const ratings = ['2+', '3.5+', '4+', '4.5+'];

const Rating = React.forwardRef((props, ref) => {
  const [rate, setRate] = React.useState('');

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
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}>
          <TouchableOpacity onPress={() => SheetManager.hide('Rating')}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                color: '#757C91',
                fontSize: customFontSize.md,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.GeistBold,
              color: '#121921',
              fontSize: customFontSize.md,
            }}>
            Select category
          </Text>
          <TouchableOpacity
            onPress={() => {
              SheetManager.hide('Rating', {
                payload: {
                  minRating: rate,
                },
              });
            }}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                color: '#017441',
                fontSize: customFontSize.md,
              }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: verticalScale(20),
          }}>
          {ratings.map((item, sub) => (
            <TouchableOpacity
              onPress={() => setRate(item)}
              key={sub}
              style={{
                backgroundColor: rate === item ? '#F9FFEB' : '#F9F9FB',
                borderColor: rate === item ? '#95D21A' : '',
                borderWidth: rate === item ? 1 : 0,
                borderRadius: 10,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
              }}>
              <Icon
                size={15}
                name={rate === item ? 'star' : 'staro'}
                color={rate === item ? '#FFD100' : ''}
              />
              <Text
                style={{
                  color: '#757C91',
                  fontFamily: fonts.GeistRegular,
                  fontSize: customFontSize.md,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ActionSheet>
  );
});

export default Rating;
