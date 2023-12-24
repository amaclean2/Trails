import React, {useState} from 'react';
import {
  ActionSheetIOS,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useAdventureStateContext,
  useSaveCompletedAdventure,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';

import {styles} from '../styles';
import {Meatball} from '../../../Assets/UIGlyphs/Meatball';
import {
  climbTypes,
  formatSeasons,
  gradeConverter,
  showClimbGrades,
} from '../utils';
import ViewField from '../../Reusable/Field';
import AdventurePathView from '../AdventurePathView';
import {generalStyles} from '../../GeneralStyles';
import {useAdventureMenu} from '../utils';
import ImageGallery from '../../Reusable/ImageGallery';
import {useImageUploads} from '../../Helpers';
import RatingPicker from '../../Reusable/RatingPicker';
import {Picker} from '@react-native-picker/picker';
import {fieldStyles} from '../../Reusable/FieldStyles';
import RatingView from '../../Reusable/RatingView';
import FlexSpacer from '../../Reusable/FlexSpacer';

const ClimbAdventureView = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {
    buildMenuContents,
    rateAdventureVisible,
    closeRateAdventure,
    openRateAdventureVisible,
  } = useAdventureMenu();
  const menuContents = buildMenuContents({navigation});
  const {saveAdventureImage} = useImageUploads();
  const {loggedInUser} = useUserStateContext();
  const {saveCompletedAdventure} = useSaveCompletedAdventure();

  const [votedRating, setVotedRating] = useState<string>('0');
  const [votedDifficulty, setVotedDifficulty] = useState<string>(
    currentAdventure?.difficulty?.split(':')[0] as string,
  );

  const onMenuPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: menuContents?.map(({text}) => text) ?? [],
        cancelButtonIndex: 0,
      },
      buttonIndex => menuContents?.[buttonIndex].action(),
    );
  };

  const submitRating = () => {
    saveCompletedAdventure({
      adventureId: currentAdventure?.id as number,
      adventureType: 'climb',
      difficulty: `${votedDifficulty}:${currentAdventure?.difficulty}`,
      rating: `${votedRating}:${currentAdventure?.rating}`,
    });
    closeRateAdventure();
  };

  const canAddTodo =
    !loggedInUser?.todo_adventures
      ?.map(({adventure_id}) => adventure_id)
      .includes(currentAdventure?.id as number) &&
    !loggedInUser?.completed_adventures
      ?.map(({adventure_id}) => adventure_id)
      .includes(currentAdventure?.id as number);

  const canComplete = !loggedInUser?.completed_adventures
    ?.map(({adventure_id}) => adventure_id)
    .includes(currentAdventure?.id as number);

  return (
    <SafeAreaView style={generalStyles.container}>
      <ScrollView>
        <View style={generalStyles.header}>
          <View style={generalStyles.headerTextLayout}>
            <Text style={generalStyles.headerText}>
              {currentAdventure?.adventure_name}
            </Text>
            <Text style={generalStyles.headerSubText}>
              {currentAdventure?.nearest_city}
            </Text>
          </View>
          {menuContents !== null && (
            <Pressable onPress={onMenuPress}>
              <Meatball />
            </Pressable>
          )}
        </View>
        <RatingView
          ratingCount={Number(currentAdventure?.rating?.split(':')[0])}
        />
        <View style={styles.adventureActionButtonContainer}>
          {canComplete && (
            <Pressable
              style={[
                generalStyles.secondaryButton,
                styles.adventureActionButton,
              ]}
              onPress={openRateAdventureVisible}>
              <Text style={[generalStyles.secondaryButtonText]}>
                Complete Adventure
              </Text>
            </Pressable>
          )}
          {canAddTodo ? (
            <Pressable
              style={[
                generalStyles.secondaryButton,
                styles.adventureActionButton,
              ]}>
              <Text style={generalStyles.secondaryButtonText}>
                Add to Todo List
              </Text>
            </Pressable>
          ) : (
            <FlexSpacer />
          )}
        </View>
        <ImageGallery
          navigation={navigation}
          source={'Adventure'}
          backName={currentAdventure?.adventure_name || ''}
          images={currentAdventure?.images as string[]}
          onAddPicture={saveAdventureImage}
        />
        <View style={styles.mapContainer}>
          <AdventurePathView navigation={navigation} />
        </View>
        <View style={styles.adventureBody}>
          <View style={styles.adventureRow}>
            <Text>{currentAdventure?.bio}</Text>
          </View>
          <View style={generalStyles.lineBreak} />
          <View style={styles.adventureRow}>
            <ViewField
              title={'Climb Type'}
              content={
                (
                  climbTypes.find(
                    type => type.value === currentAdventure?.climb_type,
                  ) ?? {label: 'Boulder'}
                ).label
              }
            />
            <ViewField
              title={'Grade'}
              content={gradeConverter(
                currentAdventure?.difficulty as string,
                currentAdventure?.climb_type,
              )}
            />
          </View>
          <View style={styles.adventureRow}>
            <ViewField
              title={'First Ascent'}
              content={currentAdventure?.first_ascent ?? ''}
            />
          </View>
          <View style={styles.adventureRow}>
            <ViewField
              title={'Protection'}
              content={currentAdventure?.protection ?? ''}
            />
          </View>
          <View style={styles.adventureRow}>
            <ViewField
              title={'Approach'}
              content={currentAdventure?.approach}
            />
          </View>
          <ViewField
            title={'Season'}
            content={formatSeasons(
              currentAdventure?.season?.length
                ? JSON.parse(currentAdventure.season)
                : [],
            )}
          />
          <ViewField
            title={'Nearest City'}
            content={currentAdventure?.nearest_city}
          />
          <ViewField
            title={'Creator'}
            content={
              <Pressable
                onPress={() =>
                  navigation.navigate('OtherProfile', {
                    name: currentAdventure?.creator_name,
                    userId: currentAdventure?.creator_id,
                  })
                }>
                <Text style={styles.fieldText}>
                  {currentAdventure?.creator_name}
                </Text>
              </Pressable>
            }
          />
        </View>
      </ScrollView>
      <Modal visible={rateAdventureVisible} transparent animationType="slide">
        <View style={generalStyles.modalContainer}>
          <View style={generalStyles.modal}>
            <Text>
              Vote on a rating and difficulty to complete this adventure
            </Text>
            <RatingPicker rating={votedRating} setRating={setVotedRating} />
            <View style={localStyles.gradePicker}>
              <Text style={fieldStyles.descriptor}>Grade</Text>
              <Picker
                selectedValue={votedDifficulty}
                onValueChange={newValue => setVotedDifficulty(newValue)}>
                {showClimbGrades(currentAdventure?.climb_type ?? 'boulder').map(
                  (item, key) => (
                    <Picker.Item
                      label={item.label}
                      value={item.value}
                      key={`picker_item_${key}`}
                    />
                  ),
                )}
              </Picker>
            </View>
            <Pressable
              style={[generalStyles.button, styles.finishButton]}
              onPress={submitRating}>
              <Text style={generalStyles.buttonText}>Complete</Text>
            </Pressable>
            <Pressable
              onPress={closeRateAdventure}
              style={[
                generalStyles.secondaryButton,
                generalStyles.closeButton,
              ]}>
              <Text style={generalStyles.secondaryButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  gradePicker: {
    marginVertical: 20,
  },
});

export default ClimbAdventureView;
