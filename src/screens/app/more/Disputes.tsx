import {View} from 'react-native';
import {IDisputes} from '../../../@types/routes';
import Tabs from '../../../components/Tabs';
import {scale} from '../../../shared/Scaling';
import CustomFlatList from '../../../components/CustomFlatList';
import DisputeCard from './components/DisputeCard';
import React from 'react';
import utils from '../../../shared/Utils';
import moreService from './services/More.service';
import DisputesDto from './dto/Disputes.dto';

const Disputes: IDisputes = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);
  const [index, setIndex] = React.useState('PENDING');
  const {data, isLoading, fetchMore} = moreService.useDisputes(index);
  console.log(data);
  
  const tabs = [
    {title: 'Ongoing', slug: 'PENDING'},
    {title: 'Resolved', slug: 'RESOLVED'},
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'white', padding: scale(16)}}>
        <Tabs tabs={tabs} initialTab={'PENDING'} onPress={setIndex} />
      </View>

      <CustomFlatList<DisputesDto>
        data={data || []}
        renderItem={({item}) => (
          <DisputeCard type={index as any} data={{disputes: item}} />
        )}
        keyExtractor={(item, ind) => ind.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
export default Disputes;
