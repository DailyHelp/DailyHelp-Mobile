import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Assets from '../../assets/Assets';
import { scale, verticalScale } from '../../shared/Scaling';
import CustomInput from '../customInput/Index';
import Typography from '../Typography';

const SearchHeader: ICustomHeader<NativeStackHeaderProps> = ({
  title,
  placeHolder,
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: verticalScale(10),
        backgroundColor: 'white',
        padding: scale(10),
      }}>
      <Typography fontWeight="bold" size="lg">
        {title}
      </Typography>

      <CustomInput
        type="text"
        placeholder={placeHolder}
        leftIcon={
          <Assets.InActiveSearch
            width={scale(20)}
            style={{bottom: verticalScale(10)}}
          />
        }
      />
    </View>
  );
};
export default SearchHeader;
