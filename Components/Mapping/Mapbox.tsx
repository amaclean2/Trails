import React from 'react';
import {StyleSheet} from 'react-native';
import {MapView, UserLocation, Camera, setAccessToken} from '@rnmapbox/maps';
import {useTokenStateContext} from '@amaclean2/sundaypeak-treewells';

const Mapbox = (): JSX.Element => {
  const {mapboxStyleKey} = useTokenStateContext();

  setAccessToken(
    'pk.eyJ1IjoiYW1hY2xlYW4iLCJhIjoiY2wydzM2YjB2MGh4dzNqb2FpeTg2bmo4dSJ9.KSDbOciqbYDn5eA4SHNOZg',
  );

  return (
    <MapView style={styles.map} styleURL={mapboxStyleKey as string}>
      <UserLocation />
      <Camera zoomLevel={10} centerCoordinate={[-120.17, 39.33]} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Mapbox;
