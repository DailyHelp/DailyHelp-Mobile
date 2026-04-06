import Container from '../../../../../components/container/Index';
import Typography from '../../../../../components/Typography';

const CodeContainer: ICodeContainer = ({code}) => {
  return (
    <Container
      backgroundColor="lightGrey"
      padding={10}
      borderRadius={10}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <Typography fontWeight="medium" color="gray">
        Code:
      </Typography>

      <Container flexDirection="row" gap={3}>
        {code.split('').map((c, index) => (
          <Container
            key={index}
            width={40}
            backgroundColor="white"
            height={40}
            justifyContent="center"
            alignItems="center"
            borderRadius={7}>
            <Typography size="md" fontWeight="medium" textAlign="center">
              {c}
            </Typography>
          </Container>
        ))}
      </Container>
    </Container>
  );
};
export default CodeContainer;
