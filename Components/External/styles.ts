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
    marginTop: 15,
  },
  fieldContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  resetText: {
    fontWeight: '600',
    padding: 10,
    fontSize: 15,
  },
});
