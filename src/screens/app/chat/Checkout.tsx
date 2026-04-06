import React from 'react';
import {View} from 'react-native';
import {ICheckout} from '../../../@types/routes';
import MainButton from '../../../components/button/MainButton';
import CustomInput from '../../../components/customInput/Index';
import Typography from '../../../components/Typography';
import {verticalScale} from '../../../shared/Scaling';
import moreService from '../more/services/More.service';
import PaymentOption from './components/PaymentOption';
import utils from '../../../shared/Utils';

const Checkout: ICheckout = ({route, navigation}) => {
  const [selectedPayment, setSelectedPayment] = React.useState<
    'PAYSTACK' | 'WALLET'
  >('PAYSTACK');
  const [description, setDescription] = React.useState('');

  const {data, isPending, mutate} = moreService.useFundWallet();

  const {wallet} = moreService.useWalletBalance();

  React.useEffect(() => {
    if (data)
      navigation.navigate('WebViewComponent', {
        url: data.data.authorizationUrl,
      });
  }, [data]);

  const summary = [
    {title: 'Amount', value: route.params?.price},
    {title: 'Service fee', value: 2000},
    {title: 'Total', value: route.params?.price},
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

          <CustomInput
            numberOfLines={4}
            multiline
            height={100}
            value={description}
            onChangeText={setDescription}
          />
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
            selected={selectedPayment === 'PAYSTACK'}
            onPress={id => setSelectedPayment('PAYSTACK')}
          />
          <PaymentOption
            id="wallet"
            icon="💳"
            title="Pay with wallet balance"
            subtitle={utils.numberWithCommas(
              wallet?.data.availableBalance || 0,
            )}
            selected={selectedPayment === 'WALLET'}
            onPress={id => setSelectedPayment('WALLET')}
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
        <MainButton
          loading={isPending}
          onPress={() => {
            mutate({
              description,
              amount: route.params?.price!,
              conversationUuid: route.params?.conversationUuid!,
              offerUuid: route.params?.offerUuid!,
              purpose: route.params?.purpose!,
              paymentMethod: selectedPayment,
            });
          }}>
          Make payment
        </MainButton>
      </View>
    </View>
  );
};
export default Checkout;
