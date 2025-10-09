import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Typography from './Typography';

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['empty', '0', 'delete'],
];

const CustomKeyPad: ICustomKeyPad = ({
  onPress,
  disabledKeys = [],
  onDelete,
  showDelete = true,
}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        {KEYS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key, index) => {
              if (key === 'empty') {
                return (
                  <View key={`empty-${index}`} style={styles.placeholder} />
                );
              }

              if (key === 'delete') {
                return showDelete ? (
                  <TouchableOpacity
                    key="delete"
                    onPress={onDelete}
                    style={styles.deleteKey}>
                    <Icon name="backspace-outline" size={24} color="#757C91" />
                  </TouchableOpacity>
                ) : (
                  <View key="delete-placeholder" style={styles.placeholder} />
                );
              }

              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.key,
                    disabledKeys.includes(key) && styles.keyDisabled,
                  ]}
                  onPress={() => onPress?.(key)}
                  disabled={disabledKeys.includes(key)}>
                  <Typography size="md" fontWeight="bold">
                    {key}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20,
  },
  key: {
    width: 64,
    height: 64,
    borderRadius: 100,
    backgroundColor: '#F9F9FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F2F4',
  },
  keyDisabled: {
    opacity: 0.5,
  },
  keyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#121926',
  },
  deleteKey: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 64,
    height: 64,
  },
});

export default CustomKeyPad;
