import React from 'react';
import {
  Keyboard,
  Linking,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  useCreateUser,
  useEditUser,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import LogoInline from '../../Assets/Logos/LogoInline';
import CheckboxElement from '../Reusable/CheckboxElement';
import {RootStackParamsList} from '../Navigation/AppContent';

import {generalStyles} from '../GeneralStyles';
import {styles} from './styles';
import {colors} from '../../Assets/Colors';

const Signup = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'SignUp'>): JSX.Element => {
  const {editFormFields} = useEditUser();
  const {formFields, userError} = useUserStateContext();
  const {createNewUser} = useCreateUser();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={[styles.container, styles.signupContainer]}>
        <LogoInline
          color={'green'}
          style={[styles.mainLogo, styles.signupLogo]}
        />
        {userError && (
          <View style={generalStyles.errorField}>
            <Text style={generalStyles.errorFieldText}>{userError}</Text>
          </View>
        )}
        <View style={styles.fieldContainer}>
          <TextInput
            placeholder="First Name"
            style={[generalStyles.inputField, styles.loginField]}
            textContentType={'givenName'}
            onChangeText={text =>
              editFormFields({name: 'first_name', value: text})
            }
            value={formFields.first_name}
          />
          <TextInput
            placeholder="Last Name"
            style={[generalStyles.inputField, styles.loginField]}
            textContentType={'familyName'}
            onChangeText={text =>
              editFormFields({name: 'last_name', value: text})
            }
            value={formFields.last_name}
          />
          <TextInput
            placeholder="Email"
            style={[generalStyles.inputField, styles.loginField]}
            textContentType={'emailAddress'}
            autoCapitalize="none"
            keyboardType={'email-address'}
            autoComplete={'email'}
            onChangeText={text => editFormFields({name: 'email', value: text})}
            value={formFields.email}
          />
          <TextInput
            placeholder="Password"
            autoComplete={'new-password'}
            textContentType={'newPassword'}
            clearTextOnFocus
            style={[generalStyles.inputField, styles.loginField]}
            secureTextEntry
            onChangeText={text =>
              editFormFields({name: 'password', value: text})
            }
            value={formFields.password}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            autoComplete={'new-password'}
            textContentType={'password'}
            clearTextOnFocus
            style={[generalStyles.inputField, styles.loginField]}
            onChangeText={text =>
              editFormFields({name: 'password_2', value: text})
            }
            value={formFields.password_2}
          />
          <View style={generalStyles.checkboxField}>
            <CheckboxElement
              title={
                <Text>
                  Agree to the Sunday Peak{' '}
                  <Text
                    onPress={() => {
                      Linking.openURL('https://sundaypeak.com/privacy');
                    }}
                    style={{color: colors.primaryAccentColor}}>
                    Privacy Policy.
                  </Text>
                </Text>
              }
              onChange={(newChecked: boolean) =>
                editFormFields({name: 'legal', value: newChecked})
              }
            />
          </View>
        </View>
        <Pressable
          style={[generalStyles.button, styles.loginButton]}
          onPress={() => createNewUser()}>
          <Text style={generalStyles.buttonText}>Sign Up for Sunday Peak</Text>
        </Pressable>
        <View style={[styles.navigateToLogin, styles.signupNavigate]}>
          <Text>Already have an account?</Text>
          <Pressable
            style={generalStyles.secondaryButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={generalStyles.secondaryButtonText}>
              Login to Sunday Peak
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
