import React from 'react';
import {FlatList} from 'react-native';

const CustomFlatList = <T extends unknown>({
  data,
  renderItem,
  keyExtractor,
  onEndReached,
  onEndReachedThreshold = 0.5,
  isLoading = false,
  emptyMessage = 'No results found',
  ListFooterComponent,
  ListHeaderComponent,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  refreshing,
  onRefresh,
  ListEmptyComponent,
  horizontal,
}: ICustomFlatListProps<T>) => {
  return (
    <FlatList
      horizontal={horizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default CustomFlatList;
