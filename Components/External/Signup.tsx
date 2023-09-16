import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {
  useCreateUser,
  useEditUser,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import CheckBox from '@react-native-community/checkbox';

import LogoInline from '../../Assets/Logos/LogoInline';
import {generalStyles} from '../GeneralStyles';

import {styles} from './styles';

const Signup = ({toggleAuthFlow = () => {}}): JSX.Element => {
  const {editFormFields} = useEditUser();
  const {formFields, userError} = useUserStateContext();
  const {createNewUser} = useCreateUser();

  return (
    <View style={styles.container}>
      <LogoInline color={'green'} style={styles.mainLogo} />
      {userError && (
        <View style={generalStyles.errorField}>
          <Text style={generalStyles.errorFieldText}>{userError}</Text>
        </View>
      )}
      <View style={styles.fieldContainer}>
        <TextInput
          placeholder="First Name"
          style={generalStyles.inputField}
          onChangeText={text =>
            editFormFields({name: 'first_name', value: text})
          }
          value={formFields.first_name}
        />
        <TextInput
          placeholder="Last Name"
          style={generalStyles.inputField}
          onChangeText={text =>
            editFormFields({name: 'last_name', value: text})
          }
          value={formFields.last_name}
        />
        <TextInput
          placeholder="Email"
          style={generalStyles.inputField}
          autoCapitalize="none"
          keyboardType={'email-address'}
          autoComplete={'email'}
          onChangeText={text => editFormFields({name: 'email', value: text})}
          value={formFields.email}
        />
        <TextInput
          placeholder="Password"
          autoComplete={'new-password'}
          style={generalStyles.inputField}
          secureTextEntry
          onChangeText={text => editFormFields({name: 'password', value: text})}
          value={formFields.password}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          autoComplete={'new-password'}
          style={generalStyles.inputField}
          onChangeText={text =>
            editFormFields({name: 'password_2', value: text})
          }
          value={formFields.password_2}
        />
        <View style={generalStyles.checkboxField}>
          <CheckBox
            value={formFields.legal}
            onValueChange={newChecked =>
              editFormFields({name: 'legal', value: newChecked})
            }
          />
          <Text>Agree to the Sunday Peak Privacy Policy.</Text>
        </View>
      </View>
      <Pressable style={generalStyles.button} onPress={createNewUser}>
        <Text style={generalStyles.buttonText}>Sign Up for Sunday Peak</Text>
      </Pressable>
      <View style={styles.navigateToLogin}>
        <Text>Already have an account?</Text>
        <Pressable
          style={generalStyles.secondaryButton}
          onPress={toggleAuthFlow}>
          <Text style={generalStyles.secondaryButtonText}>
            Login to Sunday Peak
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;
