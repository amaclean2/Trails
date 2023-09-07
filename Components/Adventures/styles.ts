import {StyleSheet} from 'react-native';
import {colors} from '../../Assets/Colors';

export const styles = StyleSheet.create({
  adventureBody: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  adventureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 50,
    justifyContent: 'flex-start',
  },
  mapContainer: {
    backgroundColor: colors.mainOffWhite,
    height: 300,
  },
  picturesContainer: {
    height: 100,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  picture: {
    height: 100,
    width: 100,
    objectFit: 'cover',
    flex: 1,
    backgroundColor: 'transparent',
  },
  addImageButton: {
    borderColor: colors.borderColor,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  fieldText: {
    fontSize: 18,
    fontWeight: '400',
    paddingVertical: 5,
    color: colors.primaryAccentColor,
  },
});
