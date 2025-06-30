import Container from '../../container/Index';
import {SheetManager} from 'react-native-actions-sheet';
import Typography from '../../Typography';
import {TouchableOpacity, View} from 'react-native';
import IconF from 'react-native-vector-icons/Feather';
import React from 'react';

const CustomSelectInput: IInput = ({
  label,
  options,
  value,
  placeholder,
  onChangeText,
  width,
}) => {
  const [select, setSelect] = React.useState('');

  const onSelect = (data?: {label?: string; value: string}) => {
    setSelect(data?.label!);
    onChangeText?.(data?.value!);
  };

  return (
    <Container width={width} gap={9}>
      <Typography size="md" fontWeight="semibold" color="gray">
        {label}
      </Typography>
      <TouchableOpacity
        onPress={() => {
          SheetManager.show('CustomSelect', {
            payload: {label, data: options},
            onClose: onSelect,
          });
        }}>
        <Container
          height={50}
          backgroundColor="lightGrey"
          flexDirection="row"
          justifyContent='space-between'
          gap={5}
          borderRadius={10}
          alignItems="center">
          <Typography
            size="sm"
            fontWeight="bold"
            color={value ? 'lightGrey' : 'gray'}>
            {select || placeholder}
          </Typography>
          <IconF name="chevron-down" size={20} color="#757C91" />
        </Container>
      </TouchableOpacity>
    </Container>
  );
};

export default CustomSelectInput;
