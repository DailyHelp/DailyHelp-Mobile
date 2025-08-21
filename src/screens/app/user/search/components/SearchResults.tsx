import React from 'react';
import Container from '../../../../../components/container/Index';
import CustomFlatList from '../../../../../components/CustomFlatList';
import HelperCard from '../../home/components/HelperCard';
import ProvidersDto from '../../home/dto/providersDto';

const SearchResults: ISearchResult = ({data, fetchMore}) => {
  const renderExploreCard = React.useCallback(
    ({item}: any) => <HelperCard mode="row" data={item} />,
    [data],
  );

  return (
    <Container width={'95'} gap={9} paddingBottom={24} alignSelf="center">
      <CustomFlatList<ProvidersDto>
        data={data}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => item.uuid + index}
        renderItem={renderExploreCard}
      />
    </Container>
  );
};
export default SearchResults;
