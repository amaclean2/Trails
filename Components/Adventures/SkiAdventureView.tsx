import React from 'react';
import {ActionSheetIOS, Pressable, ScrollView, Text, View} from 'react-native';
import {useAdventureStateContext} from '@amaclean2/sundaypeak-treewells';

import {styles} from './styles';
import {Meatball} from '../../Assets/UIGlyphs/Meatball';
import {formatGearList, formatSeasons} from './utils';
import ViewField from '../Reusable/Field';
import AdventurePathView from './AdventurePathView';

const SkiAdventureView = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();

  const onMenuPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'Cancel',
          'Add Adventure to Todo List',
          'Complete Adventure',
          'View Adventurers',
          'Edit Adventure',
          'Delete Adventure',
        ],
        destructiveButtonIndex: 5,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 3:
            navigation.navigate('Adventurers');
            break;
          case 1:
            console.log('added to todo');
            break;
          case 2:
            console.log('completed');
            break;
          case 4:
            console.log('edited');
            break;
          case 5:
            console.log('deleted');
            break;
          default:
            console.log('canceled');
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTextLayout}>
            <Text style={styles.headerText}>
              {currentAdventure?.adventure_name}
            </Text>
            <Text style={styles.headerSubText}>
              {currentAdventure?.nearest_city}
            </Text>
          </View>
          <Pressable onPress={onMenuPress}>
            <Meatball />
          </Pressable>
        </View>
        <View style={styles.mapContainer}>
          <AdventurePathView />
        </View>
        <View style={styles.adventureBody}>
          <View style={styles.adventureRow}>
            <Text>{currentAdventure?.bio}</Text>
          </View>
          <View style={styles.lineBreak} />
          <View style={styles.adventureRow}>
            <ViewField
              title={'Difficulty'}
              content={currentAdventure?.difficulty ?? '0'}
            />
            <ViewField
              title={'Exposure'}
              content={currentAdventure?.exposure ?? '0'}
            />
            <ViewField
              title={'Slope Angle'}
              content={`${currentAdventure?.avg_angle ?? ''} - ${
                currentAdventure?.max_angle ?? ''
              }\u00b0`}
            />
            <ViewField
              title={'Aspect'}
              content={currentAdventure?.aspect ?? ''}
            />
          </View>
          <View style={styles.adventureRow}>
            <ViewField
              title={'Approach'}
              content={`${currentAdventure?.distance ?? ''} mi`}
            />
            <ViewField
              title={'Elevation'}
              content={`${currentAdventure?.base_elevation ?? ''} - ${
                currentAdventure?.summit_elevation
              } ft`}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default SkiAdventureView;
