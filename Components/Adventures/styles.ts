import {StyleSheet} from 'react-native';
import {colors} from '../../Assets/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.mainLight,
    alignItems: 'flex-start',
    paddingTop: 35,
  },
  header: {
    marginVertical: 20,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingEnd: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextLayout: {
    flexDirection: 'column',
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
    width: 420,
    backgroundColor: colors.mainOffWhite,
    height: 300,
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
