import React from 'react';
import {
  useAdventureStateContext,
  useTokenStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {Camera, LineLayer, MapView, ShapeSource} from '@rnmapbox/maps';

import {calculateCameraBounds, paddingObject} from './utils';

const MapCamera = ({workingPath = [], coordinates = []}: any): JSX.Element => (
  <>
    {workingPath.length ? (
      <Camera
        bounds={calculateCameraBounds(workingPath)}
        animationMode={'moveTo'}
        padding={paddingObject(50)}
      />
    ) : (
      <Camera
        centerCoordinate={coordinates}
        zoomLevel={12}
        animationMode={'moveTo'}
      />
    )}
  </>
);

const AdventurePathView = (): JSX.Element => {
  const {mapboxStyleKey} = useTokenStateContext();
  const {workingPath, currentAdventure} = useAdventureStateContext();

  return (
    <MapView
      style={{flex: 1}}
      styleURL={mapboxStyleKey as string}
      logoEnabled={false}
      scrollEnabled={false}
      pitchEnabled={false}
      // rotateEnabled={false}
      // zoomEnabled={false}
      attributionEnabled={false}
      scaleBarEnabled={false}>
      {workingPath.length ? (
        <MapCamera workingPath={workingPath} />
      ) : (
        <MapCamera
          coordinates={[
            currentAdventure?.coordinates.lng,
            currentAdventure?.coordinates.lat,
          ]}
        />
      )}
      {workingPath.length ? (
        <ShapeSource
          id="pathSource"
          shape={{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: workingPath,
            },
          }}>
          <LineLayer
            id="pathLayer"
            style={{
              lineColor: '#38e',
              lineWidth: 5,
              lineJoin: 'round',
              lineCap: 'round',
            }}
          />
        </ShapeSource>
      ) : (
        <></>
      )}
    </MapView>
  );
};

export default AdventurePathView;
