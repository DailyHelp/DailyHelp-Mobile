import Assets from '../../../../../assets/Assets';
import Container from '../../../../../components/container/Index';
import Typography from '../../../../../components/Typography';
import GetBankResponse from '../dto/get.bank.dto';

const BankCard: IBankCard<GetBankResponse> = ({data, onPress}) => {
  return (
    <Container
      isTouchable
      gap={5}
      borderBottomWidth={0.5}
      borderColor="gray"
      onPress={() => onPress?.(data)}
      padding={10}>
      <Container flexDirection="row" justifyContent="space-between">
        <Typography fontWeight="semibold">{data?.accountNumber}</Typography>
        <Assets.Trash />
      </Container>
      <Container gap={5}>
        <Typography size="md" color="gray">
          {data?.accountName}
        </Typography>
      </Container>
      <Container flexDirection="row" gap={6}>
        <Assets.Bank />
        <Typography size="sm" color="gray">
          {data?.bankName}
        </Typography>
      </Container>
    </Container>
  );
};
export default BankCard;
