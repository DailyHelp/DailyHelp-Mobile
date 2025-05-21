import {View} from 'react-native';
import {verticalScale} from '../../../../../shared/Scaling';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';

const RecentSearches: IRecentSearches = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          marginVertical: verticalScale(20),
          width: '95%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontFamily: fonts.GeistBold,
            fontSize: customFontSize.m3d,
          }}>
          Recent searches
        </Text>
      </View>
    </View>
  );
};
export default RecentSearches;
