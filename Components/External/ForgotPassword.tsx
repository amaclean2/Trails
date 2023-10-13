import React from 'react';
import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import LogoInline from '../../Assets/Logos/LogoInline';
import {styles} from './styles';
import {generalStyles} from '../GeneralStyles';
import {
  useCreateUser,
  useEditUser,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';

const ForgotPassword = ({navigation}: any) => {
  const {sendPasswordResetLinkToEmail} = useCreateUser();
  const {editFormFields} = useEditUser();
  const {formFields} = useUserStateContext();

  const handleResetButton = () => {
    sendPasswordResetLinkToEmail();
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LogoInline color={'green'} style={styles.mainLogo} />
      <View style={styles.fieldContainer}>
        <Text style={styles.resetText}>
          Enter your email to get a reset link sent to you
        </Text>
        <TextInput
          placeholder="sunday@email.com"
          style={generalStyles.inputField}
          autoCapitalize="none"
          onChangeText={text => editFormFields({name: 'email', value: text})}
          keyboardType={'email-address'}
          autoComplete={'email'}
          value={formFields.email}
        />
      </View>
      <Pressable style={generalStyles.button} onPress={handleResetButton}>
        <Text style={generalStyles.buttonText}>Reset Password</Text>
      </Pressable>
      <Pressable
        style={generalStyles.secondaryButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={generalStyles.secondaryButtonText}>Go back to login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ForgotPassword;
