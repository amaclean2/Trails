import React, {useEffect, useState} from 'react';
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
import FlexSpacer from '../../Reusable/FlexSpacer';
import DeleteModal from './DeleteModal';
import DistanceEdit from '../../Reusable/DistanceEdit';
import {styles} from '../styles';

const SkiAdventureEditor = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {editAdventure} = useSaveAdventure();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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
      <MultiElement>
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <LargeSkierIcon size={40} />
        </View>
        <View style={styles.warningBox}>
          <Text style={styles.warningBoxText}>
            To edit the path for this adventure use the Sunday Peak website
          </Text>
        </View>
      </MultiElement>
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
      <DistanceEdit
        title="Approach Distance"
        value={currentAdventure?.distance?.toString()}
        onChange={editAdventure}
      />
      <MultiElement title={'Elevation'}>
        <DistanceEdit
          title="Base"
          name="base_elevation"
          value={currentAdventure?.base_elevation?.toString()}
          unit={'feet'}
          onChange={editAdventure}
        />
        <DistanceEdit
          title="Summit"
          name="summit_elevation"
          value={currentAdventure?.summit_elevation?.toString()}
          unit={'feet'}
          onChange={editAdventure}
        />
      </MultiElement>
      <MultiElement title={'Slope Angle'}>
        <DistanceEdit
          title="Average"
          name="avg_angle"
          value={currentAdventure?.avg_angle?.toString()}
          unit={'degrees'}
          onChange={editAdventure}
        />
        <DistanceEdit
          title="Max"
          name="max_angle"
          value={currentAdventure?.max_angle?.toString()}
          unit={'degrees'}
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
          onChange={({target: {name = '', value = ''}}) => {
            editAdventure({
              target: {name, value: `${value}:1`},
            });
          }}
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

export default SkiAdventureEditor;
