import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';

const RevenueLabel: IRevenueLabel = ({commission, tips, earnings}) => {
  return (
    <Container gap={12} marginRight={6}>
      <Container flexDirection="row" alignItems="center" gap={8}>
        <Container
          width={10}
          height={10}
          borderRadius={2}
          backgroundColor="secondary"
        />
        <Container>
          <Typography size="sm" fontWeight="bold" color='black'>
            {earnings}
          </Typography>
          <Typography size="xs" color="gray">
            Earnings
          </Typography>
        </Container>
      </Container>
      <Container flexDirection="row" alignItems="center" gap={8}>
        <Container
          width={10}
          height={10}
          borderRadius={2}
          backgroundColor="primary"
        />
        <Container>
          <Typography size="sm" fontWeight="bold" color="black">
            {tips}
          </Typography>
          <Typography size="xs" color="gray">
            Tips
          </Typography>
        </Container>
      </Container>
      <Container flexDirection="row" alignItems="center" gap={8}>
        <Container
          width={10}
          height={10}
          borderRadius={2}
          backgroundColor="danger"
        />
        <Container>
          <Typography size="sm" fontWeight="bold" color="black">
            {commission}
          </Typography>
          <Typography size="xs" color="gray">
            Commission
          </Typography>
        </Container>
      </Container>
    </Container>
  );
};
export default RevenueLabel