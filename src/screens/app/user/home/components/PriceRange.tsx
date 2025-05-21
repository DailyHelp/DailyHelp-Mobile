import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Assets from '../../../../../assets/Assets';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';

const PriceRange = React.forwardRef((props, ref) => {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState([2000, 100000]);

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
          <TouchableOpacity>
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
            Price range
          </Text>
          <TouchableOpacity>
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

        {/* Range Slider */}
        <MultiSlider
          values={[priceRange[0], priceRange[1]]}
          sliderLength={scale(340)}
          onValuesChange={setPriceRange}
          min={0}
          max={200000}
          step={1000}
          selectedStyle={{
            backgroundColor: '#3CBF4E',
          }}
          customMarkerLeft={() => <Assets.RangeMarker />}
          customMarkerRight={() => <Assets.RangeMarker />}
          trackStyle={{height: verticalScale(6), borderRadius: 20}}
          markerStyle={{
            height: 24,
            width: 24,
            backgroundColor: '#3CBF4E',
            marginTop: verticalScale(4),
          }}
        />

        {/* Price Display */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <Text
            style={{
              backgroundColor: '#F9F9FB',
              padding: 10,
              borderRadius: 8,
              fontFamily: fonts.GeistBold,
              color: '#A9AFC2',
            }}>
            ₦{priceRange[0].toLocaleString()}
          </Text>
          <Text
            style={{
              backgroundColor: '#F9F9FB',
              padding: 10,
              borderRadius: 8,
              fontFamily: fonts.GeistBold,
              color: '#A9AFC2',
            }}>
            ₦{priceRange[1].toLocaleString()}
          </Text>
        </View>
      </View>
    </ActionSheet>
  );
});

export default PriceRange;
