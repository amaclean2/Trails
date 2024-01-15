import {StyleSheet} from 'react-native';
import {colors} from '../../Assets/Colors';

export const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: colors.textAreaBackground,
  },
  bio: {
    margin: 15,
  },
  topView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginEnd: 30,
    marginTop: 15,
    gap: 10,
    alignItems: 'center',
  },

  attributeButton: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.mainOffWhite,
  },
  contentStyles: {
    fontWeight: '600',
    color: colors.primaryAccentColor,
  },
});
