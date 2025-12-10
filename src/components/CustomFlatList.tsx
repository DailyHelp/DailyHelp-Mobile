import React from 'react';
import {FlatList} from 'react-native';
import {scale, verticalScale} from '../shared/Scaling';

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
  numColumns,
  height,
  width,
  inverted = false,
  stickyHeaderHiddenOnScroll,
  StickyHeaderComponent,
  stickyHeaderIndices,
}: ICustomFlatListProps<T>) => {
  return (
    <FlatList
      horizontal={horizontal}
      numColumns={numColumns}
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
      style={height ? {height} : {flex: 1}}
      inverted={inverted}
      stickyHeaderHiddenOnScroll={stickyHeaderHiddenOnScroll}
      stickyHeaderIndices={stickyHeaderIndices}
      StickyHeaderComponent={StickyHeaderComponent}
      contentContainerStyle={{
        paddingBottom: verticalScale(20),
        width,
      }}
    />
  );
};

export default CustomFlatList;
