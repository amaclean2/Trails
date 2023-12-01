import React, {useEffect, useState} from 'react';
import EditElement from '../../Reusable/EditElement';
import {
  useAdventureStateContext,
  useSaveAdventure,
} from '@amaclean2/sundaypeak-treewells';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {generalStyles} from '../../GeneralStyles';
import MultiElement from '../../Reusable/MultiElement';
import PickerElement from '../../Reusable/PickerElement';
import {climbTypes, showClimbGrades} from '../utils';
import {LargeClimberIcon} from '../../../Assets/Activities/LargeClimberIcon';
import FlexSpacer from '../../Reusable/FlexSpacer';
import DeleteModal from './DeleteModal';

const ClimbAdventureEditor = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {editAdventure} = useSaveAdventure();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: currentAdventure?.adventure_name,
    });
  }, [currentAdventure?.adventure_name]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={generalStyles.fullScreenView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                items={showClimbGrades(
                  currentAdventure?.climb_type ?? 'boulder',
                )}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ClimbAdventureEditor;
