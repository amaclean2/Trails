import {StyleSheet} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import {colors} from '../../Assets/Colors';

export const fieldStyles = StyleSheet.create({
  textArea: {
    ...generalStyles.inputField,
    marginVertical: 5,
    marginHorizontal: 0,
  },
  textAreaContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
    flex: 1,
  },
  descriptor: {
    color: colors.mainOffDark,
    // fontWeight: '600',
    fontSize: 12,
    // textTransform: 'uppercase',
  },
  viewField: {
    flexDirection: 'column',
    paddingVertical: 10,
  },
  fieldText: {
    fontSize: 18,
    fontWeight: '400',
    paddingVertical: 5,
  },
});
