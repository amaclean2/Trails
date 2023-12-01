import React, {useEffect} from 'react';
import {Linking, SafeAreaView, Text} from 'react-native';
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
  useManipulateFlows,
  useTokenStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnPressEvent} from '@rnmapbox/maps/lib/typescript/types/OnPressEvent';

import skierIcon from '../../Assets/Activities/SkierIcon.png';
import climberIcon from '../../Assets/Activities/ClimberIcon.png';
import hikerIcon from '../../Assets/Activities/HikerIcon.png';

import {styles} from './styles';
import TypeButtons from '../Reusable/TypeButtons';
import {useSetupConversations} from './utils';
import {RootStackParamsList} from '../Navigation/AppContent';
import {useLinking} from '../Navigation/DeepLinks';

const Mapbox = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'Explore'>): JSX.Element => {
  const {mapboxStyleKey, mapboxToken} = useTokenStateContext();
  const {allAdventures, globalAdventureType, startPosition} =
    useAdventureStateContext();
  const {updateStartPosition} = useManipulateFlows();
  const {setupConversations} = useSetupConversations(navigation);
  useLinking(navigation);

  const images = {
    ski: skierIcon,
    climb: climberIcon,
    hike: hikerIcon,
  };

  useEffect(() => {
    setAccessToken(mapboxToken);
    setupConversations();

    Linking.getInitialURL().then(url => {
      console.log({url});
    });
  }, []);

  if (!mapboxToken || !allAdventures) {
    return (
      <SafeAreaView style={styles.map}>
        <Text>Waiting for access token...</Text>
      </SafeAreaView>
    );
  }

  const handleMapClick = (event: OnPressEvent) => {
    if (!event.features.length) {
      return;
    }

    const adventureProperties = event.features[0].properties ?? {};
    const adventureId = adventureProperties.id;
    const adventureType = adventureProperties.adventure_type;

    navigation.navigate('Adventures', {adventureId, adventureType});
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
        onMapIdle={({properties}) => {
          const [longitude, latitude] = properties.center;
          updateStartPosition({
            latitude: Math.round(latitude * 10000) / 10000,
            longitude: Math.round(longitude * 10000) / 10000,
            zoom: Math.round(properties.zoom * 10) / 10,
          });
        }}
        compassFadeWhenNorth>
        <UserLocation animated />
        <Camera
          zoomLevel={startPosition?.zoom ?? 10}
          centerCoordinate={[
            startPosition?.longitude ?? -120.17,
            startPosition?.latitude ?? 39.33,
          ]}
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
                size: 30,
              },
            })),
          }}>
          <SymbolLayer id="adventuresLayer" style={MapboxStyles.mapboxIcon} />
        </ShapeSource>
      </MapView>
      <TypeButtons />
      {/* <TestNotifications /> */}
    </SafeAreaView>
  );
};

const MapboxStyles = {
  mapboxIcon: {
    iconImage: ['get', 'icon'],
    iconSize: 0.45,
  },
};

export default Mapbox;
