import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {verticalScale} from '../../../../../shared/Scaling';
import Typography from '../../../../../components/Typography';

const AddressOptions = React.forwardRef<ActionSheetRef>((props, ref) => {
  return (
    <ActionSheet
      ref={ref}
      closeOnPressBack={false}
      gestureEnabled={true}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <View
        style={{
          padding: 16,
        }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            gap: 90,
          }}>
          <TouchableOpacity>
            <Typography fontWeight="semibold" size="md" color="#757C91">
              Cancel
            </Typography>
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md" color="#121921">
            Options
          </Typography>
        </View>
      </View>
    </ActionSheet>
  );
});
export default AddressOptions;
