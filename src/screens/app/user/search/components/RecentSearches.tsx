import {Text} from 'react-native-paper';
import Container from '../../../../../components/container/Index';
import {customFontSize, fonts} from '../../../../../shared/themes/Typography';
import utils from '../../../../../shared/Utils';
import Assets from '../../../../../assets/Assets';
import Typography from '../../../../../components/Typography';
import {TouchableOpacity} from 'react-native';

const RecentSearches: IRecentSearches = ({onPress}) => {
  const searches = utils.getRecentSearches();

  return (
    searches.length > 0 && (
      <Container flexDirection="column">
        <Container width={'95'} alignSelf="center" marginVertical={20}>
          <Text
            style={{
              fontFamily: fonts.GeistBold,
              fontSize: customFontSize.m3d,
            }}>
            Recent searches
          </Text>
        </Container>

        <Container flexDirection="column" gap={16} padding={6}>
          {searches.map((search, index) => (
            <TouchableOpacity key={`${search}-${index}`} onPress={() => onPress?.(search)}>
              <Container flexDirection="row" gap={4}>
                <Assets.Time />
                <Typography size="sm" color="lightBlack" fontWeight="medium">
                  {search}
                </Typography>
              </Container>
            </TouchableOpacity>
          ))}
        </Container>
      </Container>
    )
  );
};
export default RecentSearches;
