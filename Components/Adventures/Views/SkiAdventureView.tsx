import React from 'react';
import {
  ActionSheetIOS,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  useAdventureStateContext,
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

const SkiAdventureView = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {saveAdventureImage} = useImageUploads();
  const {buildMenuContents} = useAdventureMenu();
  const menuContents = buildMenuContents({navigation});
  const {loggedInUser} = useUserStateContext();

  const onMenuPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: menuContents?.map(({text}) => text) ?? [],
        cancelButtonIndex: 0,
      },
      buttonIndex => menuContents?.[buttonIndex].action(),
    );
  };

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
              content={`${currentAdventure?.difficulty ?? '0'} / 5`}
            />
            <ViewField
              title={'Exposure'}
              content={`${currentAdventure?.exposure ?? '0'} / 5`}
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
    </SafeAreaView>
  );
};

export default SkiAdventureView;
