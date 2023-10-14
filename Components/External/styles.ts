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
  signupLogo: {
    marginBottom: 20,
  },
  navigateToLogin: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
  },
  signupNavigate: {
    marginVertical: 10,
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
  signupContainer: {
    marginTop: 30,
  },
  loginField: {
    alignSelf: 'center',
    width: 330,
  },
  loginButton: {
    width: 330,
  },
});
