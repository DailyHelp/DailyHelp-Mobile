import {View} from 'react-native';
import {IWalletBalance} from '../../../@types/routes';
import MainButton from '../../../components/button/MainButton';
import Typography from '../../../components/Typography';
import {verticalScale} from '../../../shared/Scaling';
import utils from '../../../shared/Utils';
import CustomFlatList from '../../../components/CustomFlatList';
import TransactionCard from './components/TransactionCard';
import {SheetManager} from 'react-native-actions-sheet';
import moreService from './services/More.service';
import TransactionDto from './dto/Transaction.dto';
import dayjs from 'dayjs';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../../shared/stores/appStore';
import {UserTypes} from '../../../shared/Constant';

const WalletBalance: IWalletBalance = ({navigation}) => {
  utils.useHideBottomTab(navigation);

  const {wallet} = moreService.useWalletBalance();
  const {data} = moreService.useWalletTransactions();

  const userType = appStore.user_types;

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: verticalScale(20),
          gap: 10,
        }}>
        <Typography color="gray" size="md">
          Available balance
        </Typography>
        <Typography fontWeight="bold" size="m3d" currency>
          {wallet?.data.totalBalance || 0}
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
      </View>

      <View
        style={{
          flexDirection: 'column',
          marginTop: verticalScale(40),
          width: '95%',
          alignSelf: 'center',
          gap: 10,
        }}>
        <Typography color="gray" size="md" fontWeight="semibold">
          Transaction history
        </Typography>

        <CustomFlatList<TransactionDto>
          data={data}
          renderItem={({item}) => (
            <TransactionCard
              data={{
                amount: item.amount,
                date: dayjs(item.createdAt).format('DD MMM, YYYY'),
                title: 'Wallet top up',
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default observer(WalletBalance);
