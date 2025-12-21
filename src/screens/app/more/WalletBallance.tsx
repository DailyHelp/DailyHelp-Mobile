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
import Container from '../../../components/container/Index';

const WalletBalance: IWalletBalance = ({navigation}) => {
  utils.useHideBottomTab(navigation);

  const {wallet} = moreService.useWalletBalance();
  const {data} = moreService.useWalletTransactions();

  const userType = appStore.user_types;

  return (
    <Container flex={1}>
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
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginTop: verticalScale(40),
          width: '95%',
          alignSelf: 'center',
        }}>
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
      </View>
    </Container>
  );
};
export default observer(WalletBalance);
