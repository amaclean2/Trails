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
    gap: 35,
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
    borderRadius: 8,
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
  symbolView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  finishButton: {
    width: 'auto',
    marginBottom: 0,
    marginTop: 35,
  },
  adventureActionButton: {
    flex: 1,
    backgroundColor: colors.mainOffWhite,
    borderRadius: 8,
  },
  adventureActionButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 15,
    paddingTop: 20,
    gap: 10,
  },
  otherAdventurers: {
    margin: 0,
    flex: 1,
    marginVertical: 0,
    width: 'auto',
  },
});
