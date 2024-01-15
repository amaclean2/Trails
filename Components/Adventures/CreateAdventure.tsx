import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Navigation/AppContent';
import TypeButtons from '../Reusable/TypeButtons';
import {styles} from './styles';

const CreateAdventure = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'CreateAdventureView'>) => {
  return (
    <SafeAreaView style={localStyles.createAdventureContainer}>
      <Text style={localStyles.createAdventureText}>
        Select an adventure type then locate on the map.
      </Text>
      <TypeButtons isMapView={false} style={styles.listAdventureButtons} />
      <Pressable
        style={[generalStyles.button, localStyles.createAdventureButton]}
        onPress={() => navigation.navigate('CreateAdventureMap')}>
        <Text style={generalStyles.buttonText}>Locate</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  createAdventureText: {
    fontSize: 18,
  },
  createAdventureContainer: {
    margin: 15,
  },
  createAdventureButton: {
    width: '100%',
  },
});

export default CreateAdventure;
