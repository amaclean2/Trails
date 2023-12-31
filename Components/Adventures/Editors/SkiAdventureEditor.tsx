import React, {useEffect} from 'react';
import EditElement from '../../Reusable/EditElement';
import {
  useAdventureStateContext,
  useSaveAdventure,
} from '@amaclean2/sundaypeak-treewells';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {generalStyles} from '../../GeneralStyles';
import {LargeSkierIcon} from '../../../Assets/Activities/LargeSkierIcon';
import MultiElement from '../../Reusable/MultiElement';
import SliderElement from '../../Reusable/SliderElement';
import PickerElement from '../../Reusable/PickerElement';
import {directions, gearOptions, months} from '../utils';
import SelectManyElement from '../../Reusable/SelectManyElement';

const SkiAdventureEditor = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {editAdventure} = useSaveAdventure();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: currentAdventure?.adventure_name,
    });
  }, [currentAdventure?.adventure_name]);

  useEffect(() => {
    if (!currentAdventure?.season) {
      editAdventure({
        target: {
          name: 'season',
          value: JSON.stringify(months.map(() => false)),
        },
      });
    }
    if (!currentAdventure?.gear) {
      editAdventure({
        target: {
          name: 'season',
          value: JSON.stringify(months.map(() => false)),
        },
      });
    }
  }, []);

  return (
    <ScrollView style={{paddingTop: 30}}>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <LargeSkierIcon size={40} />
      </View>
      <EditElement
        title="Adventure Name"
        name="adventure_name"
        value={currentAdventure?.adventure_name}
        onChange={editAdventure}
      />
      <EditElement
        title="Description"
        name="bio"
        value={currentAdventure?.bio}
        multiline={true}
        numberOfLines={4}
        onChange={editAdventure}
      />
      <EditElement
        title="Approach Distance"
        name="distance"
        value={currentAdventure?.distance}
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
      <MultiElement title={'Slope Angle'}>
        <EditElement
          title="Average"
          name="avg_angle"
          value={currentAdventure.avg_angle.toString()}
          onChange={editAdventure}
        />
        <EditElement
          title="Max"
          name="max_angle"
          value={currentAdventure.max_angle.toString()}
          onChange={editAdventure}
        />
      </MultiElement>
      <PickerElement
        name="aspect"
        items={directions}
        onChange={editAdventure}
        title={'Aspect'}
        value={currentAdventure?.aspect ?? 'N'}
      />
      {Number(currentAdventure?.difficulty?.split(':')[1]) < 2 && (
        <SliderElement
          name="difficulty"
          value={Number(currentAdventure?.difficulty?.split(':')[0])}
          onChange={editAdventure}
          minValue={1}
          maxValue={5}
          title={'Difficulty'}
        />
      )}
      <SliderElement
        name="exposure"
        value={currentAdventure?.exposure}
        onChange={editAdventure}
        minValue={1}
        maxValue={5}
        title={'Exposure'}
      />
      <SelectManyElement
        name="gear"
        value={
          currentAdventure?.gear ?? JSON.stringify(gearOptions.map(() => false))
        }
        onChange={editAdventure}
        properties={gearOptions}
        title="Gear"
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
        value={currentAdventure?.nearest_city}
        onChange={editAdventure}
      />
      <Pressable
        style={generalStyles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={generalStyles.buttonText}>Finish</Text>
      </Pressable>
    </ScrollView>
  );
};

export default SkiAdventureEditor;
