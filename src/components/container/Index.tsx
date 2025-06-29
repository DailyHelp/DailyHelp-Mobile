import {Box} from './Box';

const Container: IContainer = ({children, ...props}) => {
  return <Box {...props}>{children}</Box>;
};
export default Container;
