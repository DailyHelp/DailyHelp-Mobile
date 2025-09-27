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
  disabled,
  onSelect: parentSelect,
}) => {
  const [select, setSelect] = React.useState<string>();

  React.useEffect(() => {
    setSelect(value!);
  }, [value]);

  const onSelect = (data?: {label?: string; value: string; data?: string}) => {
    const displayValue = data?.label || data?.data;
    const actualValue = data?.value || data?.data;

    setSelect(displayValue);
    onChangeText?.(actualValue!);
    parentSelect?.(data);
  };

  return (
    <Container width={width} gap={9}>
      <Typography size="md" fontWeight="semibold" color="gray">
        {label}
      </Typography>
      <TouchableOpacity
        onPress={() => {
          try {
            if (disabled) return;

            SheetManager.show('CustomSelect', {
              payload: {label, data: options},
              onClose: onSelect,
            });
          } catch (error) {
            console.error('CustomSelectInput - Error opening modal:', error);
          }
        }}>
        <Container
          height={50}
          backgroundColor="lightGrey"
          flexDirection="row"
          justifyContent="space-between"
          gap={5}
          padding={10}
          borderRadius={10}
          alignItems="center">
          <Typography
            size="sm"
            fontWeight="bold"
            color={value || select ? 'black' : 'gray'}>
            {value || select || placeholder}
          </Typography>
          <IconF name="chevron-down" size={20} color="#757C91" />
        </Container>
      </TouchableOpacity>
    </Container>
  );
};

export default CustomSelectInput;
