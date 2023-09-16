import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 20,
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
  fieldContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
});
