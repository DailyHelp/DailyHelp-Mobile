import {View} from 'react-native';
import {IReport} from '../../../../@types/routes';
import ReportType from './ReportType';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import ReportDetails from './ReportDetails';
import React from 'react';
import {SwiperFlatListRefProps} from 'react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps';
import CustomHeader from '../../../../components/customHeader/Index';

const Report: IReport = props => {
  const ref = React.useRef<SwiperFlatListRefProps | null>(null);
  const [index, setIndex] = React.useState(0);

  const goBack = () => {
    ref.current?.scrollToIndex({index: 0});
    setIndex(0);
  };

  const next = (title: string) => {
    ref.current?.scrollToIndex({index: 1});
    setIndex(1);
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        type="back"
        title="Report"
        {...props}
        textMiddle
        goBack={index === 1 ? goBack : undefined}
      />
      <SwiperFlatList
        ref={ref}
        autoplay={false}
        showPagination={false}
        disableGesture>
        <ReportType {...props} scroll={next} />
        <ReportDetails {...props} />
      </SwiperFlatList>
    </View>
  );
};
export default Report;
