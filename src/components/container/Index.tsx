import {TouchableOpacity} from 'react-native';
import {ColorKeys} from '../../shared/themes/Index';
import {Box} from './Box';
import Gradient from './Gradient';
import {Scroll} from './Scroll';

const Container: IContainer<ColorKeys> = ({children, ...props}) => {
  if (props.type === 'scroll') {
    return (
      <Scroll>
        <Box {...props}>{children}</Box>
      </Scroll>
    );
  }

  if (props.type === 'gradient') {
    return <Gradient {...props}>{children}</Gradient>;
  }

  return props.isTouchable ? (
    <TouchableOpacity onPress={props.onPress}>
      <Box {...props}>{children}</Box>
    </TouchableOpacity>
  ) : (
    <Box {...props}>{children}</Box>
  );
};
export default Container;
