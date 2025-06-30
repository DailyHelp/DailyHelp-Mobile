import Container from '../../../../../components/container/Index';
import Typography from '../../../../../components/Typography';

const StatsCard: IStatsCard = ({title, stats, currency, width}) => {
  return (
    <Container
      borderWidth={0.5}
      borderColor="lightDeepGrey"
      padding={15}
      width={width}
      borderRadius={5}
      gap={8}
      backgroundColor="white">
      <Typography color="gray" size="md" fontWeight="semibold">
        {title}
      </Typography>
      {currency ? (
        <Typography size="md" fontWeight="bold" color="black" currency>
          {currency}
        </Typography>
      ) : (
        <Typography size="md" color="black">
          {stats}
        </Typography>
      )}
    </Container>
  );
};
export default StatsCard;
