import {StyleSheet} from 'react-native';
import {scale} from '../../../../shared/Scaling';

export default StyleSheet.create({
  jobContainerCard: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: scale(15),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
