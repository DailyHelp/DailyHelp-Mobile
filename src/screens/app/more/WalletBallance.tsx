import {View} from 'react-native';
import {IWalletBalance} from '../../../@types/routes';
import MainButton from '../../../components/button/MainButton';
import Typography from '../../../components/Typography';
import {verticalScale} from '../../../shared/Scaling';
import utils from '../../../shared/Utils';
import CustomFlatList from '../../../components/CustomFlatList';
import TransactionCard from './components/TransactionCard';
import {SheetManager} from 'react-native-actions-sheet';

const WalletBalance: IWalletBalance = ({navigation}) => {
  utils.useHideBottomTab(navigation);

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
          32000
        </Typography>
        <MainButton onPress={() => SheetManager.show('FundWallet')}>
          Fund wallet
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

        <CustomFlatList
          data={['']}
          renderItem={() => (
            <TransactionCard
              data={{
                amount: 32000,
                date: '23 Mar, 2025. 09:12 AM',
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
export default WalletBalance;
