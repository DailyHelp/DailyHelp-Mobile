import dayjs from 'dayjs';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {Text} from 'react-native-paper';
import Assets from '../../../../assets/Assets';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import {Colors} from '../../../../shared/themes/Index';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';
import Container from '../../../../components/container/Index';

const CustomDragDateFilter = React.forwardRef<
  ActionSheetRef,
  SheetProps<'CustomDateFilter'>
>((props, ref) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    props.payload?.startDate,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    props.payload?.endDate,
  );
  const [activeField, setActiveField] = useState<'start' | 'end'>('start');

  const handleApply = () => {
    SheetManager.hide('CustomDateFilter', {
      payload: {
        startDate,
        endDate,
      },
    });
  };

  const handleCancel = () => {
    SheetManager.hide('CustomDateFilter');
  };

  const handleDateChange = (date: Date) => {
    if (activeField === 'start') {
      setStartDate(date);
      // If end date exists and is before new start date, clear it
      if (endDate && date > endDate) {
        setEndDate(undefined);
      }
    } else {
      setEndDate(date);
    }
  };

  const getCurrentDate = () => {
    if (activeField === 'start') {
      return startDate || new Date();
    }
    return endDate || startDate || new Date();
  };

  const currentDate = getCurrentDate();

  return (
    <ActionSheet
      ref={ref}
      id="CustomDateFilter"
      closeOnPressBack={false}
      gestureEnabled={true}
      backgroundInteractionEnabled={true}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: 'white',
      }}
      initialSnapIndex={0}
      overlayColor="black"
      defaultOverlayOpacity={0.5}>
      <View
        style={{
          padding: scale(16),
          backgroundColor: 'white',
          minHeight: 500,
          overflow: 'visible',
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginBottom: 24,
          }}>
          <TouchableOpacity onPress={handleCancel}>
            <Typography fontWeight="semibold" size="md" color="gray">
              Cancel
            </Typography>
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md" color="black">
            Date filter
          </Typography>
          <TouchableOpacity onPress={handleApply}>
            <Typography fontWeight="semibold" size="md" color="secondary">
              Apply
            </Typography>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'column'}}>
          {/* Start Date Input */}
          <View style={{marginBottom: 24}}>
            <Typography
              size="md"
              fontWeight="semibold"
              color="gray"
              marginBottom={9}>
              Start date
            </Typography>
            <TouchableOpacity
              onPress={() => setActiveField('start')}
              style={{
                height: verticalScale(50),
                backgroundColor: '#F9F9FB',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: scale(20),
                borderWidth: activeField === 'start' ? 1 : 0,
                borderColor:
                  activeField === 'start' ? Colors.lemonGreen : 'transparent',
              }}>
              <Text
                style={{
                  fontFamily: fonts.GeistRegular,
                  fontSize: customFontSize.sm,
                  color: startDate ? '#3B4152' : '#A9AFC2',
                }}>
                {startDate ? dayjs(startDate).format('DD-MM-YYYY') : ''}
              </Text>
              <Assets.Calendar />
            </TouchableOpacity>
          </View>

          {/* End Date Input */}
          <View style={{marginBottom: 24}}>
            <Typography
              size="md"
              fontWeight="semibold"
              color="gray"
              marginBottom={9}>
              End date
            </Typography>
            <TouchableOpacity
              onPress={() => setActiveField('end')}
              style={{
                height: verticalScale(50),
                backgroundColor: '#F9F9FB',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: scale(20),
                borderWidth: activeField === 'end' ? 1 : 0,
                borderColor:
                  activeField === 'end' ? Colors.lemonGreen : 'transparent',
              }}>
              <Text
                style={{
                  fontFamily: fonts.GeistRegular,
                  fontSize: customFontSize.sm,
                  color: endDate ? '#3B4152' : '#A9AFC2',
                }}>
                {endDate ? dayjs(endDate).format('DD-MM-YYYY') : ''}
              </Text>
              <Assets.Calendar />
            </TouchableOpacity>
          </View>

          {/* Date Picker - Inline Wheel Picker */}
          <Container flex={1}>
            <CustomDragDateFilter
              sheetId="CustomDragDateFilter"
              payload={{endDate, startDate}}
            />
          </Container>
        </View>
      </View>
    </ActionSheet>
  );
});

export default CustomDragDateFilter;
