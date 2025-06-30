import dayjs from 'dayjs';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-paper';
import IconF from 'react-native-vector-icons/Feather';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import Typography from '../Typography';

const CustomDateInput: IInput = ({label, placeholder, error, onChangeText}) => {
  const [date, setDate] = React.useState<Date | undefined>();
  const [open, setOpen] = React.useState(false);

  const hasError = !!error;

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{flexDirection: 'column', gap: 9}}>
        <Typography size="md" fontWeight="semibold" color="gray">
          {label}
        </Typography>

        <View
          style={{
            height: verticalScale(50),
            backgroundColor: '#F9F9FB',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {open ? (
            <DatePicker
              modal
              open={open}
              mode="date"
              date={date || new Date()}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                onChangeText?.(date.toISOString());
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          ) : (
            <Text
              style={{
                fontFamily: fonts.GeistBold,
                fontSize: customFontSize.sm,
                color: date ? '#3B4152' : '#A9AFC2',
                paddingTop: verticalScale(16),
                paddingLeft: scale(20),
              }}>
              {date ? dayjs(date).format('DD-MM-YYYY') : placeholder}
            </Text>
          )}

          <Assets.Calendar
            style={{marginTop: verticalScale(16), paddingRight: scale(40)}}
          />
        </View>
      </TouchableOpacity>
      <View>
        {hasError && (
          <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
            <IconF name={'alert-circle'} color="#FF3333" />
            <Text
              style={{
                color: '#FF3333',
                fontSize: customFontSize.sm,
                fontFamily: fonts.GeistRegular,
                marginTop: verticalScale(-5),
              }}>
              {error}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomDateInput;
