import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  useEditUser,
  useGetUser,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';

import {generalStyles} from '../GeneralStyles';
import {colors} from '../../Assets/Colors';

const UserDeleteModal = ({
  deleteModalVisible = false,
  closeModal = () => {},
  navigation,
}) => {
  const {deleteUser} = useEditUser();
  const {logoutUser} = useGetUser();
  const {loggedInUser} = useUserStateContext();
  const [deleteField, setDeleteField] = useState('');

  return (
    <Modal visible={deleteModalVisible} transparent animationType="slide">
      <View style={generalStyles.modalContainer}>
        <View style={generalStyles.modal}>
          <Text style={{paddingBottom: 20, textAlign: 'center', fontSize: 16}}>
            Are you sure you want to delete this account?
          </Text>
          <Text style={{paddingBottom: 20, textAlign: 'center', fontSize: 16}}>
            Enter <Text style={{fontWeight: '600'}}>{loggedInUser?.email}</Text>{' '}
            to delete the account.
          </Text>
          <TextInput
            value={deleteField}
            onChangeText={setDeleteField}
            style={[
              generalStyles.inputField,
              {marginHorizontal: 0, marginBottom: 20},
            ]}
          />
          <Pressable
            style={[
              generalStyles.button,
              generalStyles.badButton,
              deleteField === loggedInUser?.email && localStyles.deleteButton,
            ]}
            disabled={deleteField !== loggedInUser?.email}
            onPress={() => {
              closeModal();
              navigation.navigate('Login');
              deleteUser(true);
              logoutUser();
            }}>
            <Text
              style={[
                generalStyles.buttonText,
                generalStyles.badButtonText,
                deleteField === loggedInUser?.email &&
                  localStyles.deleteButtonText,
              ]}>
              Delete
            </Text>
          </Pressable>
          <Pressable
            onPress={closeModal}
            style={[generalStyles.secondaryButton, generalStyles.closeButton]}>
            <Text style={generalStyles.secondaryButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  deleteButton: {
    backgroundColor: colors.alertErrorColor,
  },
  deleteButtonText: {
    color: colors.mainLight,
  },
});

export default UserDeleteModal;
