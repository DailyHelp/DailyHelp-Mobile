import React from 'react';
import {View} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {scale} from '../../../../../shared/Scaling';
import Typography from '../../../../../components/Typography';

const WorkerSuggestions = React.forwardRef<ActionSheetRef, IWorkerSuggestion>(
  (props, ref) => {
    return (
      <ActionSheet ref={ref} gestureEnabled>
        <View style={{backgroundColor: 'white', padding: scale(10)}}>
          <View
            style={{
              flexDirection: 'column',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography fontWeight="bold" size="lg">
              Looking for someone else?
            </Typography>
            <Typography color="#757C91" size="md" textAlign="center">
              Here are a few other pros that can help.
            </Typography>
          </View>

          <View style={{flexDirection: 'column'}}></View>
        </View>
      </ActionSheet>
    );
  },
);
export default WorkerSuggestions;
