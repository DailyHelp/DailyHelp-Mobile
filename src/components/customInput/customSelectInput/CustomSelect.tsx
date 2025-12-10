import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Container from '../../container/Index';
import React from 'react';
import {TouchableOpacity, View, TextInput} from 'react-native';
import Typography from '../../Typography';
import CustomFlatList from '../../CustomFlatList';
import CustomInput from '../Index';
import Icon from 'react-native-vector-icons/Feather';

const CustomSelect = React.forwardRef<
  ActionSheetRef<'CustomSelect'>,
  SheetProps<'CustomSelect'>
>((props, ref) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(props.payload?.data || []);

  const enableSearch = props.payload?.enableSearch || false;
  const searchPlaceholder = props.payload?.searchPlaceholder || 'Search...';

  React.useEffect(() => {
    if (enableSearch && searchQuery.trim()) {
      const filtered = props.payload?.data?.filter(item =>
        item.label?.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      setFilteredData(filtered);
    } else {
      setFilteredData(props.payload?.data || []);
    }
  }, [searchQuery, props.payload?.data, enableSearch]);

  React.useEffect(() => {
    setFilteredData(props.payload?.data || []);
    setSearchQuery('');
  }, [props.payload?.data]);

  return (
    <ActionSheet
      ref={ref}
      id="CustomSelect"
      closeOnPressBack={true}
      overlayColor="black"
      defaultOverlayOpacity={0.5}
      containerStyle={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: 'white',
      }}>
      <Container padding={19} height={700}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => SheetManager.hide('CustomSelect')}>
            <Typography fontWeight="semibold" size="md" color="gray">
              Cancel
            </Typography>
          </TouchableOpacity>
          <Typography fontWeight="bold" size="md" color="black">
            {props.payload?.label || ''}
          </Typography>
          <View style={{width: 50}} />
        </View>

        {/* Search Input */}
        {enableSearch && (
          <Container marginBottom={20}>
            <CustomInput
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<Icon name="search" size={20} color="#A9AFC2" />}
              rightIcon={
                searchQuery ? (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Icon name="x" size={20} color="#A9AFC2" />
                  </TouchableOpacity>
                ) : null
              }
            />
          </Container>
        )}

        <CustomFlatList<{label?: string; value: string}>
          data={filteredData}
          keyExtractor={(item, ind) => `${item.label + ind.toString()}`}
          renderItem={({item}) => (
            <Container width={'full'}>
              <TouchableOpacity
                onPress={() => {
                  SheetManager.hide('CustomSelect', {
                    payload: {label: item.label, value: item.value, data: item},
                  });
                }}
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F1F2F4',
                }}>
                <Typography size="md" color="darkGray">
                  {item.label}
                </Typography>
              </TouchableOpacity>
            </Container>
          )}
        />
      </Container>
    </ActionSheet>
  );
});
export default CustomSelect;
