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
    width: 420,
    backgroundColor: colors.mainOffWhite,
    height: 300,
  },
});
