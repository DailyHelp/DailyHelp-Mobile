import dayjs from 'dayjs';
import React from 'react';
import {View, Text as RNText} from 'react-native';
import IconF from 'react-native-vector-icons/Feather';
import {scale, verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import Typography from '../Typography';
import {DatePicker} from '@quidone/react-native-wheel-picker';

const CustomDragDateInput: IInput = ({
  label,
  placeholder,
  error,
  onChangeText,
  value,
}) => {
  const formatDateString = (dateValue: string | undefined): string => {
    if (!dateValue) {
      return dayjs().subtract(20, 'years').format('YYYY-MM-DD');
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) return dateValue;

    const parsed = dayjs(dateValue);
    return parsed.isValid()
      ? parsed.format('YYYY-MM-DD')
      : dayjs().subtract(20, 'years').format('YYYY-MM-DD');
  };

  const [dateString, setDateString] = React.useState<string>(
    formatDateString(value),
  );

  const hasError = !!error;

  React.useEffect(() => {
    if (value) {
      const formatted = formatDateString(value);
      setDateString(formatted);
    }
  }, [value]);

  const handleDateChanged = React.useCallback(
    ({date}: {date: string}) => {
      setDateString(date);
      onChangeText?.(date);
    },
    [onChangeText],
  );

  const minDate = dayjs().subtract(100, 'years').format('YYYY-MM-DD');
  const maxDate = dayjs().format('YYYY-MM-DD');

  return (
    <View style={{width: '100%'}}>
      {label && (
        <Typography
          size="md"
          fontWeight="semibold"
          color="gray"
          marginBottom={verticalScale(15)}>
          {label}
        </Typography>
      )}
      <View
        style={{
          marginTop: label ? verticalScale(10) : 0,
          height: verticalScale(200),
          width: '100%',
        }}>
        <DatePicker
          date={dateString}
          onDateChanged={handleDateChanged}
          minDate={minDate}
          maxDate={maxDate}
          itemHeight={verticalScale(40)}
          visibleItemCount={5}
          renderMonth={() => <DatePicker.Month />}
          renderDate={() => <DatePicker.Date />}
          renderYear={() => <DatePicker.Year />}
          itemTextStyle={{
            fontFamily: fonts.GeistMedium,
            fontSize: customFontSize.md,
            color: '#757C91',
            textAlign: 'center',
          }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          overlayItemStyle={{
            backgroundColor: '#F9F9FB',
            borderRadius: 8,
          }}>
          {({dateNodes}) => {
            if (!dateNodes || dateNodes.length === 0) {
              return (
                <View
                  style={{
                    height: verticalScale(200),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <RNText
                    style={{color: '#757C91', fontSize: customFontSize.sm}}>
                    Loading date picker...
                  </RNText>
                </View>
              );
            }

            const labels = ['MONTH', 'DAY', 'YEAR'];

            return (
              <View
                style={{flexDirection: 'row', gap: scale(10), width: '100%'}}>
                {dateNodes.map((node, index) => {
                  if (!node || !node.node) {
                    return null;
                  }

                  return (
                    <View
                      key={`date-node-${index}`}
                      style={{flex: 1, alignItems: 'center'}}>
                      <RNText
                        style={{
                          fontFamily: fonts.GeistMedium,
                          fontSize: customFontSize.sm,
                          color: '#757C91',
                          marginBottom: verticalScale(10),
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          textAlign: 'center',
                          width: '100%',
                        }}>
                        {labels[index] || ''}
                      </RNText>
                      <View
                        style={{
                          width: '100%',
                          borderRadius: 8,
                          overflow: 'hidden',
                          alignItems: 'center',
                        }}>
                        {node.node}
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          }}
        </DatePicker>
      </View>
      {hasError && (
        <View
          style={{
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
            marginTop: 5,
          }}>
          <IconF name={'alert-circle'} color="#FF3333" />
          <Typography color="danger" size="xs">
            {error}
          </Typography>
        </View>
      )}
    </View>
  );
};

export default CustomDragDateInput;
