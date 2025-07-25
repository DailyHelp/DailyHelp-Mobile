import Container from '../../../../../components/container/Index';
import Typography from '../../../../../components/Typography';

const StatsCard: IStatsCard = ({data, width}) => {
  const {title, stats, currency, Icon, goal} = data!;
  return (
    <Container
      borderWidth={0.5}
      borderColor="lightDeepGrey"
      padding={15}
      width={width}
      borderRadius={10}
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
        <Container flexDirection="row" alignItems="center" gap={4}>
          {Icon && <Icon />}
          <Typography size="md" color="black" fontWeight="bold">
            {stats}
          </Typography>
        </Container>
      )}

      {goal && (
        <Container flexDirection="row" alignItems="center" gap={4}>
          <Typography>Goal:</Typography>
          <Typography size="sm" color="black" fontWeight="bold">
            {goal}
          </Typography>
        </Container>
      )}
    </Container>
  );
};
export default StatsCard;
