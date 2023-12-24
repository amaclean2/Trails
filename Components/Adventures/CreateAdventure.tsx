import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import RadioSelect from '../Reusable/RadioSelect';
import {
  useAdventureStateContext,
  useGetAdventures,
} from '@amaclean2/sundaypeak-treewells';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Navigation/AppContent';

const CreateAdventure = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'CreateAdventureView'>) => {
  const {globalAdventureType} = useAdventureStateContext();
  const {changeAdventureType} = useGetAdventures();
  return (
    <SafeAreaView style={localStyles.createAdventureContainer}>
      <Text style={localStyles.createAdventureText}>
        Select an adventure type then locate on the map.
      </Text>
      <RadioSelect
        options={[
          {label: 'Ski', value: 'ski'},
          {label: 'Climb', value: 'climb'},
          {label: 'Hike', value: 'hike'},
        ]}
        onPress={value => changeAdventureType({type: value})}
        selectedValue={globalAdventureType as string}
      />
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
