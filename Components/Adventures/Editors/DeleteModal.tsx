import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import {styles} from '../styles';
import {generalStyles} from '../../GeneralStyles';
import {
  useAdventureStateContext,
  useDeleteAdventure,
} from '@amaclean2/sundaypeak-treewells';

const DeleteModal = ({
  deleteModalVisible = false,
  closeModal = () => {},
  navigation,
}) => {
  const {currentAdventure} = useAdventureStateContext();
  const {deleteAdventure} = useDeleteAdventure();

  return (
    <Modal visible={deleteModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={{paddingBottom: 20, textAlign: 'center', fontSize: 16}}>
            Are you sure you want to delete {currentAdventure?.adventure_name}?
          </Text>
          <Pressable
            style={[generalStyles.button, generalStyles.badButton]}
            onPress={() => {
              deleteAdventure({
                adventureId: currentAdventure?.id as number,
                adventureName: currentAdventure?.adventure_name as string,
                adventureType: currentAdventure?.adventure_type ?? 'ski',
              });
              closeModal();
              navigation.navigate('ExploreStack');
            }}>
            <Text
              style={[generalStyles.buttonText, generalStyles.badButtonText]}>
              Delete Adventure
            </Text>
          </Pressable>
          <Pressable
            onPress={closeModal}
            style={[generalStyles.secondaryButton, styles.closeButton]}>
            <Text style={generalStyles.secondaryButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
