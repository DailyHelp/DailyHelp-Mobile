import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';
import Container from '../container/Index';
import CustomInput from '../customInput/Index';
import Typography from '../Typography';
import {ColorKeys} from '../../shared/themes/Index';

const SearchHeader: ICustomHeader<NativeStackHeaderProps, ColorKeys> = ({
  title,
  placeHolder,
  onSearch,
  value,
  onFocus,
  onBlur,
  onRightIconPress,
  onLeftIconPress,
}) => {
  return (
    <Container
      marginTop={10}
      padding={10}
      backgroundColor="white"
      width={'full'}>
      <Typography fontWeight="bold" size="lg">
        {title}
      </Typography>

      <CustomInput
        type="text"
        placeholder={placeHolder}
        onChangeText={onSearch}
        onLeftIconPress={onLeftIconPress}
        onRightIconPress={onRightIconPress}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        rightIcon={value && <Assets.SearchClose width={scale(20)} />}
        leftIcon={
          <Assets.InActiveSearch
            width={scale(20)}
            style={{bottom: verticalScale(10)}}
          />
        }
      />
    </Container>
  );
};
export default SearchHeader;
