import { useFocusEffect } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { IWalletBalance } from '../../../@types/routes';
import MainButton from '../../../components/button/MainButton';
import Container from '../../../components/container/Index';
import CustomFlatList from '../../../components/CustomFlatList';
import Typography from '../../../components/Typography';
import { UserTypes } from '../../../shared/Constant';
import { appStore } from '../../../shared/stores/appStore';
import utils from '../../../shared/Utils';
import TransactionCard from './components/TransactionCard';
import WalletFunded from './components/WalletFunded';
import TransactionDto from './dto/Transaction.dto';
import moreService from './services/More.service';

const WalletBalance: IWalletBalance = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);
  const [walletFunded, setWalletFunded] = React.useState(false);
  const queryClient = useQueryClient();

  const {wallet} = moreService.useWalletBalance();
  const {data} = moreService.useWalletTransactions();

  // Check if we're returning from a successful payment
  React.useEffect(() => {
    if (route.params?.paymentSuccess) {
      setWalletFunded(true);
      // Clear the param to prevent showing it again
      navigation.setParams({paymentSuccess: undefined});
    }
  }, [route.params?.paymentSuccess, navigation]);

  // Refetch wallet and transactions when screen comes into focus
  // This ensures data refreshes after returning from payment webview
  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries({queryKey: ['wallet']});
      queryClient.invalidateQueries({queryKey: ['transactions']});
    }, [queryClient]),
  );

  const userType = appStore.user_types;

  return (
    <Container flex={1}>
      <Container
        justifyContent="center"
        alignItems="center"
        marginTop={20}
        gap={10}>
        <Typography color="gray" size="md">
          Available balance
        </Typography>
        <Typography fontWeight="bold" size="m3d" currency>
          {wallet?.data?.totalBalance || 0}
        </Typography>
        <MainButton
          enableButtonColor={
            userType === UserTypes.CUSTOMER ? 'primary' : 'secondary'
          }
          color={userType === UserTypes.CUSTOMER ? 'secondary' : 'white'}
          onPress={() => {
            SheetManager.show('FundWallet', {
              payload: {
                type: userType === UserTypes.CUSTOMER ? 'FUND' : 'WITHDRAW',
                navigation,
              },
            });
          }}>
          {userType === UserTypes.CUSTOMER ? 'Fund wallet' : 'Withdraw'}
        </MainButton>
      </Container>

      <Container flex={1} marginTop={40} width={'95'} alignSelf="center">
        <Typography
          color="gray"
          size="md"
          fontWeight="semibold"
          marginBottom={10}>
          Transaction history
        </Typography>

        <View style={{flex: 1}}>
          <CustomFlatList<TransactionDto>
            data={data}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) => (
              <TransactionCard
                data={{
                  amount: item.amount,
                  date: dayjs(item.createdAt).format('DD MMM, YYYY'),
                  title: item.remark,
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Container>

      <WalletFunded
        isVisible={walletFunded}
        onClose={() => setWalletFunded(!walletFunded)}
        header="Wallet funded"
        description="Your wallet has been topped up successfully. You're all set to make payments!"
        onPress={() => setWalletFunded(!walletFunded)}
      />
    </Container>
  );
};
export default observer(WalletBalance);
