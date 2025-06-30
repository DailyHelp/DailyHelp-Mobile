import { ColorKeys } from '../../shared/themes/Index';
import {Box} from './Box';
import {Scroll} from './Scroll';

const Container: IContainer<ColorKeys> = ({children, ...props}) => {
  if (props.type === 'scroll') return <Scroll {...props}>{children}</Scroll>;
  
  return <Box {...props}>{children}</Box>;
};
export default Container;
