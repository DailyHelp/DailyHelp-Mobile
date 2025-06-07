import {View} from 'react-native';
import {IDisputes} from '../../../../@types/routes';
import Tabs from '../../../../components/Tabs';
import {scale} from '../../../../shared/Scaling';
import CustomFlatList from '../../../../components/CustomFlatList';
import DisputeCard from './components/DisputeCard';
import React from 'react';
import utils from '../../../../shared/Utils';

const Disputes: IDisputes = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);
  const [index, setIndex] = React.useState('ongoing');
  const tabs = [
    {title: 'Ongoing', slug: 'ongoing'},
    {title: 'Resolved', slug: 'resolved'},
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'white', padding: scale(16)}}>
        <Tabs tabs={tabs} initialTab={index} onPress={setIndex} />
      </View>

      <CustomFlatList
        data={['', '', '', '']}
        renderItem={() => <DisputeCard type={index as any} />}
        keyExtractor={(item, ind) => ind.toString()}
      />
    </View>
  );
};
export default Disputes;
