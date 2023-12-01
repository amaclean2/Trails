import React, {useEffect} from 'react';
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  useEditUser,
  useGetUser,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import Keychain from 'react-native-keychain';

import LogoInline from '../../Assets/Logos/LogoInline';
import {RootStackParamsList} from '../Navigation/AppContent';

import {generalStyles} from '../GeneralStyles';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'Login'>): JSX.Element => {
  const {editFormFields} = useEditUser();
  const {formFields, userError} = useUserStateContext();
  const {loginUser} = useGetUser();
  const {loggedInUser} = useUserStateContext();

  if (loggedInUser) {
    navigation.navigate('AppTabs');
  }

  const handleLogin = () => {
    loginUser()
      .then(() =>
        Keychain.setGenericPassword(formFields.email, formFields.password),
      )
      .catch(() => {
        console.log('login failed...');
      });
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      Keychain.getGenericPassword().then(credentials => {
        if (credentials) {
          console.log('Not ready for this');
          // editFormFields({name: 'email', value: credentials.username});
          // editFormFields({name: 'password', value: credentials.password});
        } else {
          console.log('No credentials stored');
        }
      });
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <LogoInline color={'green'} style={[styles.mainLogo]} />
        {userError && (
          <View style={generalStyles.errorField}>
            <Text style={generalStyles.errorFieldText}>{userError}</Text>
          </View>
        )}
        <View style={styles.fieldContainer}>
          <TextInput
            placeholder="Email"
            style={[generalStyles.inputField, styles.loginField]}
            autoCapitalize="none"
            onChangeText={text => editFormFields({name: 'email', value: text})}
            keyboardType={'email-address'}
            autoComplete={'email'}
            value={formFields.email}
          />
          <TextInput
            placeholder="Password"
            style={[generalStyles.inputField, styles.loginField]}
            onChangeText={text =>
              editFormFields({name: 'password', value: text})
            }
            autoComplete={'current-password'}
            secureTextEntry
            value={formFields.password}
          />
        </View>
        <Pressable
          style={[generalStyles.button, styles.loginButton]}
          onPress={() => handleLogin()}>
          <Text style={generalStyles.buttonText}>Login to Sunday Peak</Text>
        </Pressable>
        <Pressable
          style={generalStyles.secondaryButton}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={generalStyles.secondaryButtonText}>
            Forgot Password?
          </Text>
        </Pressable>
        <View style={styles.navigateToLogin}>
          <Text>Don't yet have an account?</Text>
          <Pressable
            style={generalStyles.secondaryButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={generalStyles.secondaryButtonText}>
              Sign up for Sunday Peak
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
