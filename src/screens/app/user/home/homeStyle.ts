import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../../../shared/Scaling';

export default StyleSheet.create({
  serviceProfileCloseButton: {
    position: 'absolute',
    width: scale(40),
    height: verticalScale(40),
    backgroundColor: 'white',
    zIndex: 100,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    left: 10,
  },
  serviceProfileScrollImage: {
    height: verticalScale(270),
    margin: scale(5),
    borderRadius: 20,
    width: scale(350),
  },
});
