import React from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LogoInline from '../../Assets/Logos/LogoInline';
import {styles} from './styles';
import {generalStyles} from '../GeneralStyles';
import {
  useCreateUser,
  useEditUser,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Navigation/AppContent';

const ForgotPassword = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'ForgotPassword'>) => {
  const {sendPasswordResetLinkToEmail} = useCreateUser();
  const {editFormFields} = useEditUser();
  const {formFields} = useUserStateContext();

  const handleResetButton = () => {
    sendPasswordResetLinkToEmail();
    navigation.navigate('Login');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <LogoInline
          color={'green'}
          style={[styles.mainLogo, {marginTop: -90}]}
        />
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
            returnKeyType={'send'}
            onSubmitEditing={handleResetButton}
            value={formFields.email}
          />
        </View>
        <Pressable style={generalStyles.button} onPress={handleResetButton}>
          <Text style={generalStyles.buttonText}>Reset Password</Text>
        </Pressable>
        <Pressable
          style={generalStyles.secondaryButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={generalStyles.secondaryButtonText}>
            Go back to login
          </Text>
        </Pressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
