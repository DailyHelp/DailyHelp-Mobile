import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import Assets from '../../../../../assets/Assets';
import Typography from '../../../../../components/Typography';
import {scale, verticalScale} from '../../../../../shared/Scaling';
import {fonts} from '../../../../../shared/themes/Typography';

const PriceRange = React.forwardRef((props, ref) => {
  const [priceRange, setPriceRange] = useState([2000, 100000]);
  const [minInput, setMinInput] = useState('2000');
  const [maxInput, setMaxInput] = useState('100000');
  const isInputChangingRef = React.useRef(false);

  const handleMinChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setMinInput(numericValue);

    if (numericValue) {
      const numValue = parseInt(numericValue, 10);
      if (!isNaN(numValue)) {
        isInputChangingRef.current = true;

        const newMin = Math.min(Math.max(0, numValue), priceRange[1], 200000);
        setPriceRange([newMin, priceRange[1]]);

        if (newMin !== numValue) {
          setMinInput(newMin.toString());
        }
        setTimeout(() => {
          isInputChangingRef.current = false;
        }, 0);
      }
    } else {
      isInputChangingRef.current = true;
      setTimeout(() => {
        isInputChangingRef.current = false;
      }, 0);
    }
  };

  const handleMaxChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setMaxInput(numericValue);

    if (numericValue) {
      const numValue = parseInt(numericValue, 10);
      if (!isNaN(numValue)) {
        isInputChangingRef.current = true;

        const newMax = Math.max(Math.min(200000, numValue), priceRange[0], 0);
        setPriceRange([priceRange[0], newMax]);

        if (newMax !== numValue) {
          setMaxInput(newMax.toString());
        }
        setTimeout(() => {
          isInputChangingRef.current = false;
        }, 0);
      }
    } else {
      isInputChangingRef.current = true;
      setTimeout(() => {
        isInputChangingRef.current = false;
      }, 0);
    }
  };

  React.useEffect(() => {
    if (!isInputChangingRef.current) {
      setMinInput(priceRange[0].toString());
      setMaxInput(priceRange[1].toString());
    }
  }, [priceRange]);

  return (
    <ActionSheet
      ref={ref as any}
      closeOnPressBack={false}
      gestureEnabled={true}
      overlayColor="black"
      defaultOverlayOpacity={0.5}
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
          <TouchableOpacity onPress={() => SheetManager.hide('PriceRange')}>
            <Typography fontWeight="bold" size="md" color="gray">
              Cancel
            </Typography>
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md" color="black">
            Price range
          </Typography>
          <TouchableOpacity
            onPress={() => {
              SheetManager.hide('PriceRange', {
                payload: {maxPrice: priceRange[1], minPrice: priceRange[0]},
              });
            }}>
            <Typography fontWeight="bold" size="md" color="secondary">
              Apply
            </Typography>
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

        {/* Price Input */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            gap: 52,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#F9F9FB',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                color: '#A9AFC2',
                marginRight: 4,
              }}>
              ₦
            </Text>
            <TextInput
              value={minInput}
              onChangeText={handleMinChange}
              keyboardType="numeric"
              placeholder="Min"
              placeholderTextColor="#A9AFC2"
              style={{
                flex: 1,
                fontFamily: fonts.GeistBold,
                color: '#A9AFC2',
                fontSize: 14,
                padding: 0,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#F9F9FB',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                color: '#A9AFC2',
                marginRight: 4,
              }}>
              ₦
            </Text>
            <TextInput
              value={maxInput}
              onChangeText={handleMaxChange}
              keyboardType="numeric"
              placeholder="Max"
              placeholderTextColor="#A9AFC2"
              style={{
                flex: 1,
                fontFamily: fonts.GeistBold,
                color: '#A9AFC2',
                fontSize: 14,
                padding: 0,
              }}
            />
          </View>
        </View>
      </View>
    </ActionSheet>
  );
});

export default PriceRange;
