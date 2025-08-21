import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import Assets from '../../assets/Assets';
import {scale, verticalScale} from '../../shared/Scaling';
import Container from '../container/Index';
import CustomInput from '../customInput/Index';
import Typography from '../Typography';

const SearchHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  placeHolder,
  onSearch,
  value,
  onFocus,
  onBlur
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
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
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
