import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {useTokenStateContext} from '@amaclean2/sundaypeak-treewells';

const Mapbox = (): JSX.Element => {
  const {mapboxStyleKey} = useTokenStateContext();

  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiYW1hY2xlYW4iLCJhIjoiY2wydzM2YjB2MGh4dzNqb2FpeTg2bmo4dSJ9.KSDbOciqbYDn5eA4SHNOZg',
  );

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={mapboxStyleKey as string}>
          <MapboxGL.UserLocation />
          <MapboxGL.Camera zoomLevel={10} centerCoordinate={[-120.17, 39.33]} />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 800,
    width: 400,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default Mapbox;
