import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import Container from '../../container/Index';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Typography from '../../Typography';
import CustomFlatList from '../../CustomFlatList';

const CustomSelect = React.forwardRef<
  ActionSheetRef<'CustomSelect'>,
  SheetProps<'CustomSelect'>
>((props, ref) => {
  return (
    <ActionSheet
      ref={ref}
      closeOnPressBack={false}
      gestureEnabled={true}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <Container padding={19} height={700}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Typography fontWeight="bold" size="md" color="gray">
              Cancel
            </Typography>
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md" color="black">
            {props.payload?.label || ''}
          </Typography>
        </View>

        <CustomFlatList<{label?: string; value: string}>
          data={props.payload?.data}
          keyExtractor={(item, ind) => `${item.label + ind.toString()}`}
          renderItem={({item}) => (
            <Container width={'full'}>
              <TouchableOpacity>
                <Typography>{item.label}</Typography>
              </TouchableOpacity>
            </Container>
          )}
        />
      </Container>
    </ActionSheet>
  );
});
export default CustomSelect;
