import React from 'react';
import {
  ActionSheetIOS,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useAdventureStateContext} from '@amaclean2/sundaypeak-treewells';

import {styles} from '../styles';
import {Meatball} from '../../../Assets/UIGlyphs/Meatball';
import {formatGearList, formatSeasons} from '../utils';
import ViewField from '../../Reusable/Field';
import AdventurePathView from '../AdventurePathView';
import {generalStyles} from '../../GeneralStyles';

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
        ],
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
          default:
            console.log('canceled');
        }
      },
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
          <View style={generalStyles.lineBreak} />
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
    </SafeAreaView>
  );
};

export default SkiAdventureView;
