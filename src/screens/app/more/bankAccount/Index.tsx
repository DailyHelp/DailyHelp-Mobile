import {ISelectBank} from '../../../../@types/routes';
import Container from '../../../../components/container/Index';
import CustomFlatList from '../../../../components/CustomFlatList';
import moreService from '../services/More.service';
import BankCard from './components/BankCard';
import GetBankResponse from './dto/get.bank.dto';

const SelectBank: ISelectBank = ({navigation, route}) => {
  const {bankAccounts} = moreService.useGetBankAccount();

  const Item = (data: {item: GetBankResponse; index: number}) => (
    <BankCard
      data={data.item}
      onPress={(data: GetBankResponse) => {
        navigation.navigate('ConfirmTransaction', {
          amount: route.params?.amount!,
          bankAccountUuid: data.uuid!,
          accountNumber: data.accountNumber,
          bankName: data.bankName,
          accountName: data.accountName,
        });
      }}
    />
  );

  return (
    <Container height={'full'} backgroundColor="white" padding={10}>
      <CustomFlatList<GetBankResponse>
        data={bankAccounts?.data}
        renderItem={Item}
        keyExtractor={item => item.uuid!}
      />
    </Container>
  );
};
export default SelectBank;
