import Container from '../../../../../components/container/Index';
import Typography from '../../../../../components/Typography';

const CodeContainer: ICodeContainer = ({code}) => {
  return (
    <Container
      backgroundColor="gray"
      padding={7}
      borderRadius={7}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <Typography fontWeight="medium" color="gray">
        Code:
      </Typography>

      <Container flexDirection="row" gap={1}>
        {code.split('').map(c => (
          <Container
            width={40}
            backgroundColor="white"
            height={40}
            borderRadius={5}>
            <Typography textAlign="center">{c}</Typography>
          </Container>
        ))}
      </Container>
    </Container>
  );
};
export default CodeContainer;
