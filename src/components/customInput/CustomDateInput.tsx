import {TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../shared/themes/Typography';
import {scale, verticalScale} from '../../shared/Scaling';
import React from 'react';
import DatePicker from 'react-native-date-picker';
import Assets from '../../assets/Assets';
import dayjs from 'dayjs';

const CustomDateInput: IInput = ({label, placeholder}) => {
  const [date, setDate] = React.useState<Date | undefined>();
  const [open, setOpen] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => setOpen(true)}
      style={{flexDirection: 'column', gap: 9}}>
      <Text
        style={{
          fontFamily: fonts.GeistBold,
          fontSize: customFontSize.sm,
          color: '#757C91',
        }}>
        {label}
      </Text>

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
  );
};

export default CustomDateInput;
