import {View} from 'react-native';
import Container from './container/Index';
import Typography from './Typography';

const SectionBorderSeparatedCard: ISectionBorderSeparatedCard = ({
  type,
  title,
  amount,
  isBold,
}) => {
  return (
    <Container flexDirection="row" alignItems="center" height={20}>
      <Typography
        size="sm"
        color="gray"
        fontWeight={isBold ? 'bold' : 'regular'}>
        {title}
      </Typography>
      <View
        style={{
          flex: 1,
          height: 1,
          marginHorizontal: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#D6DBE7',
          borderStyle: 'dashed',
        }}
      />
      {type ? (
        <Typography size="sm" color="gray" currency>
          {type === 'CREDIT' ? '+' : '-'} {amount}
        </Typography>
      ) : typeof amount === 'number' ? (
        <Typography size="sm" color="gray" currency>
          {amount}
        </Typography>
      ) : (
        <Typography size="sm" color="gray">
          {amount}
        </Typography>
      )}
    </Container>
  );
};

export default SectionBorderSeparatedCard;
