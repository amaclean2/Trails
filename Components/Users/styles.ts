import {StyleSheet} from 'react-native';
import {colors} from '../../Assets/Colors';

export const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    backgroundColor: colors.borderColor,
  },
  bio: {
    margin: 15,
  },
  topView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginEnd: 30,
    marginTop: 15,
    gap: 20,
    alignItems: 'center',
  },
});
