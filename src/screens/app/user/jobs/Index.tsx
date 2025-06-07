import {View} from 'react-native';
import {IJobs} from '../../../../@types/routes';
import CustomHeader from '../../../../components/customHeader/Index';
import JobsCard from './components/JobsCard';
import React from 'react';
import {scale} from '../../../../shared/Scaling';
import CustomFlatList from '../../../../components/CustomFlatList';

const Jobs: IJobs = props => {
  const [type, setType] = React.useState('pending');

  const jobs = [
    {title: 'Pending', slug: 'pending'},
    {title: 'Ongoing', slug: 'ongoing'},
    {title: 'Completed', slug: 'completed'},
  ];

  const renderItem = React.useCallback(() => {
    return (
      <View style={{marginBottom: scale(16)}}>
        <JobsCard
          type={type as any}
          viewDetails={() => {
            props.navigation.navigate('ViewDetails', {type: type as any});
          }}
        />
      </View>
    );
  }, [type]);

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        type="tabs"
        {...props}
        title="Jobs"
        onPress={setType}
        initialTab="pending"
        tabs={jobs}
      />
      <View style={{padding: scale(15), height: '90%'}}>
        <CustomFlatList
          data={['1', '2', '3', '4', '5']}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default Jobs;
