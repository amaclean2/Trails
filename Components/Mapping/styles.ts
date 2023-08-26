import {StyleSheet} from 'react-native';
import {colors} from '../../Assets/Colors';

export const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  buttonContainer: {
    marginBottom: -78,
    marginTop: 50,
    height: 28,
    flexDirection: 'row',
    gap: 5,
    paddingEnd: 5,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: colors.mainOffWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: colors.mainDark,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  activeButton: {
    backgroundColor: colors.primaryAccentColor,
  },
  activeButtonText: {
    color: colors.mainLight,
  },
});
