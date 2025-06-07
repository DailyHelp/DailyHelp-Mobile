import {View} from 'react-native';
import {scale} from '../../../../../shared/Scaling';
import Typography from '../../../../../components/Typography';
import React from 'react';

const TransactionCard: ITransactionCard = ({data, type = 'credit'}) => {
  return (
    <View
      style={{
        padding: scale(10),
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'column', gap: 6}}>
        <Typography fontWeight="semibold" size="md" limit={50}>
          {data?.title}
        </Typography>
        <Typography color="#757C91">{data?.date}</Typography>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 3,
          alignItems: 'center',
        }}>
        <Typography
          color={type === 'credit' ? '#27A535' : '#F0443A'}
          fontWeight="bold">
          {type === 'credit' ? '+' : '-'}
        </Typography>
        <Typography
          fontWeight="semibold"
          color={type === 'credit' ? '#27A535' : '#F0443A'}
          currency>
          {data?.amount}
        </Typography>
      </View>
    </View>
  );
};
export default React.memo(TransactionCard);
