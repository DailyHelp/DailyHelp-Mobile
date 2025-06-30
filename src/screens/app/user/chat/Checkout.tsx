import {View} from 'react-native';
import {ICheckout} from '../../../../@types/routes';
import Typography from '../../../../components/Typography';
import {verticalScale} from '../../../../shared/Scaling';
import utils from '../../../../shared/Utils';
import {useState} from 'react';
import PaymentOption from './components/PaymentOption';
import MainButton from '../../../../components/button/MainButton';

const Checkout: ICheckout = () => {
  const [selectedPayment, setSelectedPayment] = useState('wallet');
  const summary = [
    {title: 'Amount', value: 32000},
    {title: 'Service fee', value: 2000},
    {title: 'Total', value: 34000},
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'column', gap: 7}}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'white',
            flexDirection: 'column',
            gap: 7,
            marginTop: verticalScale(10),
            borderRadius: 6,
            padding: 16,
          }}>
          <Typography color="gray" fontWeight="bold">
            DESCRIPTION
          </Typography>

          <Typography readMore readMoreConstant limit={90} lineHeight={25}>
            I want to make a brazzilian twisting for my wedding, see the
            attachment for sample
          </Typography>
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'white',
            flexDirection: 'column',
            gap: 7,
            marginTop: verticalScale(10),
            borderRadius: 6,
            padding: 16,
          }}>
          <Typography color="gray" fontWeight="bold">
            SUMMARY
          </Typography>

          <View style={{flexDirection: 'column', gap: 10}}>
            {summary.map(({title, value}, key) => (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                key={key}>
                {title.toLowerCase() == 'total' ? (
                  <Typography color="gray" fontWeight="bold">
                    {title}
                  </Typography>
                ) : (
                  <Typography color="gray">{title}</Typography>
                )}

                {title.toLowerCase() == 'total' ? (
                  <Typography fontWeight="bold" currency>
                    {value}
                  </Typography>
                ) : (
                  <Typography currency>{value}</Typography>
                )}
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'white',
            flexDirection: 'column',
            gap: 7,
            marginTop: verticalScale(10),
            borderRadius: 6,
            padding: 16,
          }}>
          <Typography color="gray" fontWeight="bold">
            PAYMENT OPTIONS
          </Typography>
          <PaymentOption
            id="online"
            icon="🌐"
            title="Pay online"
            selected={selectedPayment === 'online'}
            onPress={id => setSelectedPayment(id.toString())}
          />
          <PaymentOption
            id="wallet"
            icon="💳"
            title="Pay with wallet balance"
            subtitle="₦40,000"
            selected={selectedPayment === 'wallet'}
            onPress={id => setSelectedPayment(id.toString())}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
        }}>
        <MainButton>Make payment</MainButton>
      </View>
    </View>
  );
};
export default Checkout;
