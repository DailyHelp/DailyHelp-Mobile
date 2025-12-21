import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Typography from '../../../../../components/Typography';
import {IDispute} from '../../../../../@types/routes';
import MainButton from '../../../../../components/button/MainButton';

const DisputeSubmitted: IDispute = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            backgroundColor: '#F9FFEB',
            borderColor: '#95D21A',
            borderWidth: 1,
            borderRadius: 50,
            width: 64,
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}>
          <Icon name="check" size={20} color={'#95D21A'} />
        </View>

        <Typography color="black" size="m3d" fontWeight="semibold">
          Report Submitted
        </Typography>

        <Typography color="gray" size="sm" marginTop={12} textAlign="center">
          Thanks for letting us know. We'll review this and take appropriate
          action. Your safety is our top priority.
        </Typography>
      </View>

      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 50,
        }}>
        <MainButton onPress={() => navigation.pop(2)}>
          Return home
        </MainButton>
      </View>
    </View>
  );
};

export default DisputeSubmitted;
