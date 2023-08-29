import {StyleSheet} from 'react-native';
import {colors} from '../Assets/Colors';

export const generalStyles = StyleSheet.create({
  inputField: {
    backgroundColor: colors.offBackgroundColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 3,
    borderRadius: 8,
    width: 350,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primaryAccentColor,
    width: 350,
    paddingVertical: 10,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.mainLight,
    fontWeight: '700',
  },
  secondaryButton: {},
  secondaryButtonText: {
    fontWeight: '700',
    color: colors.primaryAccentColor,
    padding: 10,
  },
  errorField: {
    backgroundColor: colors.alertErrorColor,
    borderRadius: 8,
    width: 350,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    margin: 8,
  },
  errorFieldText: {
    color: colors.mainLight,
    fontWeight: '700',
    textAlign: 'center',
  },
  checkboxField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
    marginVertical: 15,
  },
  header: {
    marginVertical: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingEnd: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noSpaceHeader: {
    marginTop: 5,
  },
  headerTextLayout: {
    flexDirection: 'column',
    maxWidth: 300,
  },
  headerText: {
    color: colors.primaryAccentColor,
    fontWeight: '700',
    fontSize: 20,
  },
  headerSubText: {
    fontSize: 15,
    paddingTop: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.mainLight,
    alignItems: 'stretch',
  },
  noSpaceContainer: {
    paddingTop: 20,
  },
  lineBreak: {
    borderBottomColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 20,
  },
  listText: {
    fontSize: 18,
  },
  listItem: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    borderBlockColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listImage: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
});
