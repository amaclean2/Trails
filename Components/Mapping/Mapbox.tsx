import React from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {
  MapView,
  UserLocation,
  Camera,
  setAccessToken,
  SymbolLayer,
  ShapeSource,
  Images,
} from '@rnmapbox/maps';
import {
  useAdventureStateContext,
  useGetAdventures,
  useTokenStateContext,
} from '@amaclean2/sundaypeak-treewells';
import skierIcon from '../../Assets/Activities/SkierIcon.png';
import climberIcon from '../../Assets/Activities/ClimberIcon.png';
import hikerIcon from '../../Assets/Activities/HikerIcon.png';
import {OnPressEvent} from '@rnmapbox/maps/lib/typescript/types/OnPressEvent';

import {styles} from './styles';
import Search from '../../Assets/UIGlyphs/Search';

const Mapbox = ({navigation}: any): JSX.Element => {
  const {mapboxStyleKey, mapboxToken} = useTokenStateContext();
  const {allAdventures, globalAdventureType} = useAdventureStateContext();
  const {changeAdventureType} = useGetAdventures();

  const images = {
    ski: skierIcon,
    climb: climberIcon,
    hike: hikerIcon,
  };

  setAccessToken(mapboxToken);

  if (!mapboxToken || !allAdventures) {
    return (
      <View style={styles.map}>
        <Text>Waiting for access token...</Text>
      </View>
    );
  }

  const handleMapClick = (event: OnPressEvent) => {
    if (!event.features.length) {
      return;
    }

    const adventureProperties = event.features[0].properties ?? {};
    const adventureId = adventureProperties.id;
    const adventureType = adventureProperties.adventure_type;

    navigation.navigate('AdventureStack', {
      screen: 'Adventures',
      params: {adventureId, adventureType},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        scaleBarEnabled={false}
        style={styles.map}
        styleURL={mapboxStyleKey as string}
        compassEnabled
        compassPosition={{bottom: 15, left: 15}}
        logoEnabled={false}
        compassFadeWhenNorth>
        <UserLocation />
        <Camera
          zoomLevel={10}
          centerCoordinate={[-120.17, 39.33]}
          animationMode={'moveTo'}
        />
        <Images images={images} />
        <ShapeSource
          onPress={handleMapClick}
          id="adventureSource"
          shape={{
            ...allAdventures,
            features: allAdventures.features.map(mappedFeature => ({
              ...mappedFeature,
              properties: {
                ...mappedFeature.properties,
                icon: globalAdventureType,
              },
            })),
          }}>
          <SymbolLayer id="adventuresLayer" style={MapboxStyles.mapboxIcon} />
        </ShapeSource>
      </MapView>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => changeAdventureType({type: 'ski'})}
          style={[
            styles.button,
            globalAdventureType === 'ski' && styles.activeButton,
          ]}>
          <Text
            style={[
              styles.buttonText,
              globalAdventureType === 'ski' && styles.activeButtonText,
            ]}>
            Ski
          </Text>
        </Pressable>
        <Pressable
          onPress={() => changeAdventureType({type: 'climb'})}
          style={[
            styles.button,
            globalAdventureType === 'climb' && styles.activeButton,
          ]}>
          <Text
            style={[
              styles.buttonText,
              globalAdventureType === 'climb' && styles.activeButtonText,
            ]}>
            Climb
          </Text>
        </Pressable>
        <Pressable
          onPress={() => changeAdventureType({type: 'hike'})}
          style={[
            styles.button,
            globalAdventureType === 'hike' && styles.activeButton,
          ]}>
          <Text
            style={[
              styles.buttonText,
              globalAdventureType === 'hike' && styles.activeButtonText,
            ]}>
            Hike
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('AdventureStack', {
              screen: 'DefaultAdventure',
            })
          }
          style={[styles.button, {backgroundColor: 'transparent'}]}>
          <Text style={styles.buttonText}>
            <Search isDark />
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const MapboxStyles = {
  mapboxIcon: {
    iconImage: ['get', 'icon'],
    iconSize: 0.4,
  },
};

export default Mapbox;
