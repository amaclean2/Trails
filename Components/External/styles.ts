import {StyleSheet} from 'react-native';
import {colors} from '../../Assets/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mainLogo: {
    width: 350,
    resizeMode: 'contain',
    height: 100,
    marginBottom: 50,
  },
  navigateToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
