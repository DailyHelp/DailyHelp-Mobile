import {View} from 'react-native';
import {IJobs} from '../../../../@types/routes';
import CustomHeader from '../../../../components/customHeader/Index';
import JobsCard from './components/JobsCard';
import React from 'react';
import {scale} from '../../../../shared/Scaling';

const Jobs: IJobs = props => {
  const [type, setType] = React.useState('pending');

  return (
    <View style={{flex: 1}}>
      <CustomHeader type="jobs" {...props} title="Jobs" onPress={setType} />
      <View style={{padding: scale(15)}}>
        <JobsCard
          type={type as any}
          viewDetails={() => props.navigation.navigate('ViewDetails')}
        />
      </View>
    </View>
  );
};
export default Jobs;
