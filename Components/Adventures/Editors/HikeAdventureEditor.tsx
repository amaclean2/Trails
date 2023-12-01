import React, {useEffect, useState} from 'react';
import EditElement from '../../Reusable/EditElement';
import {
  useAdventureStateContext,
  useSaveAdventure,
} from '@amaclean2/sundaypeak-treewells';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {generalStyles} from '../../GeneralStyles';
import MultiElement from '../../Reusable/MultiElement';
import SliderElement from '../../Reusable/SliderElement';
import {LargeHikerIcon} from '../../../Assets/Activities/LargeHikerIcon';
import SelectManyElement from '../../Reusable/SelectManyElement';
import {months} from '../utils';
import FlexSpacer from '../../Reusable/FlexSpacer';
import DeleteModal from './DeleteModal';

const HikeAdventureEditor = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {editAdventure} = useSaveAdventure();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: currentAdventure?.adventure_name,
    });
  }, [currentAdventure?.adventure_name]);

  return (
    <ScrollView style={{paddingTop: 30}}>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <LargeHikerIcon size={40} />
      </View>
      <EditElement
        title="Adventure Name"
        name="adventure_name"
        value={currentAdventure?.adventure_name ?? ''}
        onChange={editAdventure}
      />
      <EditElement
        title="Description"
        name="bio"
        value={currentAdventure?.bio ?? ''}
        multiline
        onChange={editAdventure}
      />
      <EditElement
        title="Distance"
        name="distance"
        value={currentAdventure?.distance?.toString()}
        multiline
        onChange={editAdventure}
      />
      <MultiElement title={'Elevation'}>
        <EditElement
          title="Base"
          name="base_elevation"
          value={currentAdventure?.base_elevation.toString()}
          onChange={editAdventure}
        />
        <EditElement
          title="Summit"
          name="summit_elevation"
          value={currentAdventure?.summit_elevation.toString()}
          onChange={editAdventure}
        />
      </MultiElement>
      <SliderElement
        name="difficulty"
        value={currentAdventure?.difficulty}
        onChange={editAdventure}
        minValue={1}
        maxValue={5}
        title={'Difficulty'}
      />
      <SelectManyElement
        name="season"
        value={
          currentAdventure?.season ?? JSON.stringify(months.map(() => false))
        }
        onChange={editAdventure}
        properties={months}
        title="Season"
      />
      <EditElement
        title="Nearest City"
        name="nearest_city"
        value={currentAdventure?.nearest_city ?? ''}
        onChange={editAdventure}
      />
      <Pressable
        style={generalStyles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={generalStyles.buttonText}>Finish</Text>
      </Pressable>
      <Pressable
        style={[generalStyles.backButton, generalStyles.badButton]}
        onPress={() => {
          setIsDeleteModalVisible(true);
        }}>
        <Text
          style={[
            generalStyles.buttonText,
            generalStyles.badButtonText,
          ]}>{`Delete ${currentAdventure?.adventure_name}`}</Text>
      </Pressable>
      <FlexSpacer height={60} />
      <DeleteModal
        deleteModalVisible={isDeleteModalVisible}
        navigation={navigation}
        closeModal={() => setIsDeleteModalVisible(false)}
      />
    </ScrollView>
  );
};

export default HikeAdventureEditor;
