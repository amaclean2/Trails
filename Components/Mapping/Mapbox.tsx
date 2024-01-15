import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
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
  useDebounce,
  useManipulateFlows,
  useTokenStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnPressEvent} from '@rnmapbox/maps/lib/typescript/types/OnPressEvent';

import skierIcon from '../../Assets/Activities/SkierIcon.png';
import climberIcon from '../../Assets/Activities/ClimberIcon.png';
import hikerIcon from '../../Assets/Activities/HikerIcon.png';
import bikerIcon from '../../Assets/Activities/BikerIcon.png';

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
  const [userCurrentLocation, setUserCurrentLocation] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [hasMapMoved, setHasMapMoved] = useState(false);

  const cameraRef = useRef(null);

  const images = {
    ski: skierIcon,
    climb: climberIcon,
    hike: hikerIcon,
    bike: bikerIcon,
  };

  const trackUser = useDebounce(
    location =>
      setUserCurrentLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }),
    5000,
  );

  useEffect(() => {
    setAccessToken(mapboxToken);
    setupConversations();
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

  const jumpToUser = () => {
    userCurrentLocation &&
      cameraRef?.current?.setCamera({
        centerCoordinate: [userCurrentLocation.lng, userCurrentLocation.lat],
        zoomLevel: 14,
      });
    setHasMapMoved(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        scaleBarEnabled={false}
        style={styles.map}
        styleURL={mapboxStyleKey as string}
        compassEnabled
        compassPosition={{bottom: 15, left: 15}}
        logoEnabled={false}
        onMapIdle={({properties}) => {
          const [longitude, latitude] = properties.center;
          setHasMapMoved(true);
          updateStartPosition({
            latitude: Math.round(latitude * 10000) / 10000,
            longitude: Math.round(longitude * 10000) / 10000,
            zoom: Math.round(properties.zoom * 10) / 10,
          });
        }}
        compassFadeWhenNorth>
        <UserLocation animated onUpdate={location => trackUser(location)} />
        <Camera
          zoomLevel={startPosition?.zoom ?? 10}
          centerCoordinate={[
            startPosition?.longitude ?? -120.17,
            startPosition?.latitude ?? 39.33,
          ]}
          animationMode={'moveTo'}
          ref={cameraRef}
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
      <TypeButtons
        jumpToUser={() => jumpToUser()}
        mapMoved={hasMapMoved}
        isMapView
      />
    </View>
  );
};

const MapboxStyles = {
  mapboxIcon: {
    iconImage: ['get', 'icon'],
    iconSize: 0.45,
  },
};

export default Mapbox;
