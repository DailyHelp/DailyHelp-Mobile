import { ColorKeys } from '../../shared/themes/Index';
import MainButton from './MainButton';

const OutlineButton: ICustomButton<ColorKeys> = props => {
  return (
    <MainButton mode="outlined" {...props}>
      {props.children}
    </MainButton>
  );
};
export default OutlineButton;
