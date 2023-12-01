import React, {useState} from 'react';
import {
  ActionSheetIOS,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  useAdventureStateContext,
  useGetUser,
  useSaveCompletedAdventure,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';

import {styles} from '../styles';
import {Meatball} from '../../../Assets/UIGlyphs/Meatball';
import {formatGearList, formatSeasons, useAdventureMenu} from '../utils';
import ViewField from '../../Reusable/Field';
import AdventurePathView from '../AdventurePathView';
import {generalStyles} from '../../GeneralStyles';
import ImageGallery from '../../Reusable/ImageGallery';
import {useImageUploads} from '../../Helpers';
import {
  AngleIcon,
  DistanceIcon,
  ElevationIcon,
} from '../../../Assets/Symbols/LabelIcons';
import {AspectIcon} from '../../../Assets/Symbols/AspectIcon';
import RatingPicker from '../../Reusable/RatingPicker';
import RatingView from '../../Reusable/RatingView';
import DifficultyGraphic from '../../../Assets/Symbols/Difficulty';
import FlexSpacer from '../../Reusable/FlexSpacer';

const SkiAdventureView = ({navigation}: any): JSX.Element => {
  const [votedRating, setVotedRating] = useState('0');
  const [votedDifficulty, setVotedDifficulty] = useState('0');

  const {currentAdventure} = useAdventureStateContext();
  const {saveAdventureImage} = useImageUploads();
  const {
    buildMenuContents,
    rateAdventureVisible,
    closeRateAdventure,
    openRateAdventureVisible,
  } = useAdventureMenu();
  const menuContents = buildMenuContents({navigation});
  const {loggedInUser} = useUserStateContext();
  const {saveCompletedAdventure} = useSaveCompletedAdventure();
  const {getNonLoggedInUser} = useGetUser();

  const onMenuPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: menuContents?.map(({text}) => text) ?? [],
        cancelButtonIndex: 0,
      },
      buttonIndex => menuContents?.[buttonIndex].action(),
    );
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
          onAddPicture={
            currentAdventure?.creator_id === loggedInUser?.id
              ? saveAdventureImage
              : undefined
          }
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
              title={'Difficulty'}
              content={
                <DifficultyGraphic
                  difficultyLevel={Number(
                    currentAdventure?.difficulty?.split(':')[0],
                  )}
                />
              }
            />
            <ViewField
              title={'Exposure'}
              content={`E${currentAdventure?.exposure}`}
            />
            <ViewField
              title={'Slope Angle'}
              content={
                <View style={styles.symbolView}>
                  <AngleIcon />
                  <Text>
                    {`${currentAdventure?.avg_angle ?? ''} - ${
                      currentAdventure?.max_angle ?? ''
                    }\u00b0`}
                  </Text>
                </View>
              }
            />
          </View>
          <View style={styles.adventureRow}>
            <ViewField
              title={'Aspect'}
              content={
                <View style={styles.symbolView}>
                  <AspectIcon direction={currentAdventure?.aspect} />
                </View>
              }
            />
            <ViewField
              title={'Approach'}
              content={
                <View style={styles.symbolView}>
                  <DistanceIcon />
                  <Text>{`${currentAdventure?.distance ?? ''} mi`}</Text>
                </View>
              }
            />
            <ViewField
              title={'Elevation'}
              content={
                <View style={styles.symbolView}>
                  <ElevationIcon />
                  <Text>{`${currentAdventure?.base_elevation ?? ''} - ${
                    currentAdventure?.summit_elevation
                  } ft`}</Text>
                </View>
              }
            />
          </View>
          <ViewField
            title={'Gear'}
            content={formatGearList(
              currentAdventure?.gear?.length
                ? JSON.parse(currentAdventure.gear)
                : [],
            )}
          />
          <ViewField
            title={'Season'}
            content={formatSeasons(
              currentAdventure?.season?.length
                ? JSON.parse(currentAdventure.season)
                : [],
            )}
          />
          <ViewField
            title={'Creator'}
            content={
              <Pressable
                onPress={() => {
                  getNonLoggedInUser({userId: currentAdventure?.creator_id});
                  navigation.navigate('OtherProfile', {
                    name: currentAdventure?.creator_name,
                    userId: currentAdventure?.creator_id,
                  });
                }}>
                <Text style={styles.fieldText}>
                  {currentAdventure?.creator_name}
                </Text>
              </Pressable>
            }
          />
        </View>
      </ScrollView>
      <Modal visible={rateAdventureVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text>
              Vote on a rating and difficulty to complete this adventure
            </Text>
            <RatingPicker rating={votedRating} setRating={setVotedRating} />
            <RatingPicker
              title={'Difficulty'}
              rating={votedDifficulty}
              color="blue"
              setRating={setVotedDifficulty}
            />
            <Pressable
              style={[generalStyles.button, styles.finishButton]}
              onPress={() => {
                saveCompletedAdventure({
                  adventureId: currentAdventure?.id as number,
                  adventureType: 'ski',
                  difficulty: `${votedDifficulty}:${currentAdventure?.difficulty}`,
                  rating: `${votedRating}:${currentAdventure?.rating}`,
                });
                closeRateAdventure();
              }}>
              <Text style={generalStyles.buttonText}>Complete</Text>
            </Pressable>
            <Pressable
              onPress={closeRateAdventure}
              style={[generalStyles.secondaryButton, styles.closeButton]}>
              <Text style={generalStyles.secondaryButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SkiAdventureView;
