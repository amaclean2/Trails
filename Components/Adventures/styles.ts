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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    padding: 20,
    backgroundColor: colors.mainLight,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: colors.mainDark,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: 350,
  },
  finishButton: {
    width: 'auto',
    marginBottom: 0,
    marginTop: 35,
  },
  closeButton: {
    width: 'auto',
    alignItems: 'center',
    marginTop: 10,
  },
  adventureActionButton: {
    flex: 1,
    backgroundColor: colors.mainOffWhite,
    alignItems: 'center',
    borderRadius: 8,
  },
  adventureActionButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 15,
    paddingTop: 20,
    gap: 10,
  },
});
