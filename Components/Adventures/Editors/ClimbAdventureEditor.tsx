import React, {useEffect} from 'react';
import EditElement from '../../Reusable/EditElement';
import {
  useAdventureStateContext,
  useSaveAdventure,
} from '@amaclean2/sundaypeak-treewells';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {generalStyles} from '../../GeneralStyles';
import MultiElement from '../../Reusable/MultiElement';
import PickerElement from '../../Reusable/PickerElement';
import {climbTypes, showClimbGrades} from '../utils';
import {LargeClimberIcon} from '../../../Assets/Activities/LargeClimberIcon';

const ClimbAdventureEditor = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {editAdventure} = useSaveAdventure();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: currentAdventure?.adventure_name,
    });
  }, [currentAdventure?.adventure_name]);

  console.log(Number(currentAdventure?.difficulty?.split(':')[1]) < 2);

  return (
    <ScrollView style={{paddingTop: 30}}>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <LargeClimberIcon size={40} />
      </View>
      <EditElement
        title="Adventure Name"
        name="adventure_name"
        value={currentAdventure?.adventure_name ?? ''}
        onChange={editAdventure}
      />
      <MultiElement title="Climb Info">
        <PickerElement
          title={'Climb Type'}
          name={'climb_type'}
          value={currentAdventure?.climb_type}
          items={climbTypes}
          onChange={editAdventure}
        />
        {Number(currentAdventure?.difficulty?.split(':')[1]) < 2 && (
          <PickerElement
            title={'Grade'}
            name={'difficulty'}
            value={
              currentAdventure?.difficulty?.split(':')[0] ?? 'None Selected'
            }
            items={showClimbGrades(currentAdventure?.climb_type ?? 'boulder')}
            onChange={({target: {name, value}}) => {
              editAdventure({target: {name, value: `${value}:1`}});
            }}
          />
        )}
      </MultiElement>
      <EditElement
        title="Description"
        name="bio"
        value={currentAdventure?.bio ?? ''}
        multiline
        onChange={editAdventure}
      />
      <EditElement
        title="Approach"
        name="approach"
        value={currentAdventure?.approach}
        multiline
        onChange={editAdventure}
      />
      <EditElement
        title="Protection"
        name="protection"
        value={currentAdventure?.protection}
        multiline
        onChange={editAdventure}
      />
      <EditElement
        title="First Ascent"
        name="first_ascent"
        value={currentAdventure?.first_ascent}
        onChange={editAdventure}
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
    </ScrollView>
  );
};

export default ClimbAdventureEditor;
