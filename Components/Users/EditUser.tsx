import {
  useEditUser,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import React, {useEffect} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import EditElement from '../Reusable/EditElement';
import {colors} from '../../Assets/Colors';
import {useImageUploads} from '../Helpers';
import {generalStyles} from '../GeneralStyles';
import PickerElement from '../Reusable/PickerElement';
import {sexLabels} from '../Adventures/utils';
import {fieldStyles} from '../Reusable/FieldStyles';

const EditUser = ({navigation}: any): JSX.Element => {
  const {loggedInUser} = useUserStateContext();
  const {updateProfilePicture} = useImageUploads();
  const {editUser} = useEditUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${loggedInUser?.first_name} ${loggedInUser?.last_name}`,
    });
  }, [loggedInUser?.first_name, loggedInUser?.last_name, navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={localStyles.profileImageText}>Profile Image</Text>
          <Pressable
            onPress={updateProfilePicture}
            style={localStyles.profilePicture}>
            <Image
              source={{uri: loggedInUser?.profile_picture_url}}
              style={localStyles.imageSource}
            />
          </Pressable>
        </View>
        <EditElement
          name={'first_name'}
          title="First Name"
          value={loggedInUser?.first_name ?? ''}
          onChange={editUser}
          autoComplete="given-name"
        />
        <EditElement
          name={'last_name'}
          title="Last Name"
          value={loggedInUser?.last_name ?? ''}
          onChange={editUser}
          autoComplete="family-name"
        />
        <EditElement
          name={'email'}
          title="Email"
          value={loggedInUser?.email ?? ''}
          onChange={editUser}
          autoComplete="email"
          keyboardType="email-address"
        />
        <EditElement
          name={'city'}
          title="Location"
          value={loggedInUser?.city ?? ''}
          onChange={editUser}
        />
        <EditElement
          name={'phone'}
          title="Phone"
          value={loggedInUser?.phone ?? ''}
          onChange={editUser}
          autoComplete="tel"
          keyboardType="phone-pad"
        />
        <EditElement
          name={'user_site'}
          title="Website"
          value={loggedInUser?.user_site ?? ''}
          onChange={editUser}
        />
        <PickerElement
          onChange={editUser}
          value={loggedInUser?.sex ?? 'male'}
          title={'Gender'}
          name={'sex'}
          items={sexLabels}
        />
        <EditElement
          name={'bio'}
          title="Bio"
          value={loggedInUser?.bio ?? ''}
          multiline={true}
          numberOfLines={4}
          onChange={editUser}
        />
        <Pressable
          style={generalStyles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={generalStyles.buttonText}>Finish</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  profilePicture: {
    backgroundColor: colors.borderColor,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
  },
  imageSource: {
    width: 100,
    height: 100,
  },
  profileImageText: {
    ...fieldStyles.descriptor,
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default EditUser;
