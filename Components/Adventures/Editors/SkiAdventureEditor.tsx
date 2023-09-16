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
import {Slider} from 'react-native-elements';
import {colors} from '../../../Assets/Colors';
import SliderElement from '../../Reusable/SliderElement';
import {Picker} from '@react-native-picker/picker';
import PickerElement from '../../Reusable/PickerElement';
import {directions} from '../utils';

const SkiAdventureEditor = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {editAdventure} = useSaveAdventure();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: currentAdventure?.adventure_name,
    });
  }, [currentAdventure?.adventure_name]);

  return (
    <ScrollView style={{marginTop: 30}}>
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
      <SliderElement
        name="difficulty"
        value={currentAdventure?.difficulty}
        onChange={editAdventure}
        minValue={1}
        maxValue={5}
        title={'Difficulty'}
      />
      <SliderElement
        name="exposure"
        value={currentAdventure?.exposure}
        onChange={editAdventure}
        minValue={1}
        maxValue={5}
        title={'Exposure'}
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
