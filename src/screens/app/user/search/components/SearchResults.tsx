import React from 'react';
import Container from '../../../../../components/container/Index';
import CustomFlatList from '../../../../../components/CustomFlatList';
import HelperCard from '../../home/components/HelperCard';
import ProvidersDto from '../../home/dto/providersDto';
import Typography from '../../../../../components/Typography';

const SearchResults: ISearchResult = ({data, fetchMore}) => {
  const renderExploreCard = React.useCallback(
    ({item}: any) => <HelperCard mode="row" data={item} />,
    [data],
  );

  return (
    <Container width={'95'} gap={9} paddingBottom={24} alignSelf="center" flex={1}>
      <CustomFlatList<ProvidersDto>
        data={data}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => item.uuid + index}
        renderItem={renderExploreCard}
        ListEmptyComponent={() => (
          <Container padding={20} alignItems="center">
            <Typography size="md" color="gray" textAlign="center">
              No results found
            </Typography>
            <Typography size="sm" color="gray" textAlign="center" style={{marginTop: 8}}>
              Try searching with different keywords
            </Typography>
          </Container>
        )}
        showsVerticalScrollIndicator={true}
      />
    </Container>
  );
};
export default SearchResults;
