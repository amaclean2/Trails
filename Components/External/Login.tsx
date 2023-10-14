import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styles} from './styles';
import {generalStyles} from '../GeneralStyles';
import LogoInline from '../../Assets/Logos/LogoInline';
import {
  useEditUser,
  useGetUser,
  useMessages,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';

const Login = ({navigation}: any): JSX.Element => {
  const {editFormFields} = useEditUser();
  const {formFields, userError} = useUserStateContext();
  const {loginUser} = useGetUser();
  const {initiateConnection} = useMessages();
  const {loggedInUser} = useUserStateContext();

  if (loggedInUser) {
    navigation.navigate('AppTabs');
  }

  return (
    <View style={styles.container}>
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
          onChangeText={text => editFormFields({name: 'password', value: text})}
          autoComplete={'current-password'}
          secureTextEntry
          value={formFields.password}
        />
      </View>
      <Pressable
        style={[generalStyles.button, styles.loginButton]}
        onPress={() => loginUser().then(initiateConnection)}>
        <Text style={generalStyles.buttonText}>Login to Sunday Peak</Text>
      </Pressable>
      <Pressable
        style={generalStyles.secondaryButton}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={generalStyles.secondaryButtonText}>Forgot Password?</Text>
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
    </View>
  );
};

export default Login;
