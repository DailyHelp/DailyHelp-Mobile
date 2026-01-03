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
import CustomDragDateInput from '../../../../components/customInput/CustomDragDateInput';

const CustomDateFilter = React.forwardRef<
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
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    // Validate that end date is not before start date using dayjs for accurate comparison
    if (
      startDate &&
      endDate &&
      dayjs(endDate).isBefore(dayjs(startDate), 'day')
    ) {
      // Show input error and prevent applying
      setError('End date cannot be before the start date.');
      return;
    }

    // Clear any previous error on successful apply
    setError(null);

    SheetManager.hide('CustomDateFilter', {
      payload: {
        startDate,
        endDate,
      },
    });
  };

  const handleCancel = () => {
    setError(null);
    SheetManager.hide('CustomDateFilter');
  };

  const handleDateChange = (dateString: string) => {
    const date = dayjs(dateString).toDate();
    if (activeField === 'start') {
      setStartDate(date);
      // Clear any previous error when adjusting start date
      setError(null);
      // If end date exists and is before new start date, clear it
      if (endDate && dayjs(date).isAfter(dayjs(endDate))) {
        setEndDate(undefined);
      }
    } else {
      // Prevent setting end date before start date using dayjs for accurate comparison
      if (startDate && dayjs(date).isBefore(dayjs(startDate), 'day')) {
        // Show input error and don't allow end date to be set before start date
        setError('End date cannot be before the start date.');
        return;
      }
      setEndDate(date);
      setError(null);
    }
  };

  const getCurrentDateString = () => {
    const currentDate = activeField === 'start' ? startDate : endDate;
    if (currentDate) {
      return dayjs(currentDate).format('YYYY-MM-DD');
    }
    // For end date, if start date exists, default to start date instead of today
    if (activeField === 'end' && startDate) {
      return dayjs(startDate).format('YYYY-MM-DD');
    }
    return dayjs().format('YYYY-MM-DD');
  };

  return (
    <ActionSheet
      ref={ref}
      id="CustomDateFilter"
      closeOnPressBack={false}
      gestureEnabled={false}
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
          <View style={{marginBottom: 24, gap: 7}}>
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
          <View style={{marginBottom: 24, gap: 7}}>
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
            {!!error && (
              <Text
                style={{
                  marginTop: verticalScale(4),
                  fontFamily: fonts.GeistRegular,
                  fontSize: customFontSize.sm,
                  color: '#F04438',
                }}>
                {error}
              </Text>
            )}
          </View>

          {/* Date Picker - Inline Wheel Picker */}
          <Container flex={1}>
            <CustomDragDateInput
              value={getCurrentDateString()}
              onChangeText={handleDateChange}
            />
          </Container>
        </View>
      </View>
    </ActionSheet>
  );
});

export default CustomDateFilter;

