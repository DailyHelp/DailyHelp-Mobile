import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  chatFooterContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'column',
    gap: 7,
    paddingBottom: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    padding: 10,
  },
  chatFooterButton: {
    borderRadius: 100,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D6DBE7',
    padding: 10,
    gap: 7,
  },
  chatMessageContainer: {
    flexDirection: 'column',
    gap: 10,
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#F1F2F4',
    margin: 10,
  },
});
