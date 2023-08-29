import React from 'react';
import {
  useAdventureStateContext,
  useTokenStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {
  Camera,
  Images,
  LineLayer,
  MapView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';

import skierIcon from '../../Assets/Activities/SkierIcon.png';
import climberIcon from '../../Assets/Activities/ClimberIcon.png';
import hikerIcon from '../../Assets/Activities/HikerIcon.png';

import {paddingObject, pathColor} from './utils';

const MapCamera = ({workingPath = []}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  return (
    <>
      {currentAdventure?.path && workingPath.length ? (
        <Camera
          bounds={currentAdventure?.cameraBounds}
          animationMode={'moveTo'}
          padding={paddingObject(50)}
        />
      ) : (
        <Camera
          centerCoordinate={[
            currentAdventure?.coordinates.lng as number,
            currentAdventure?.coordinates.lat as number,
          ]}
          zoomLevel={14}
          animationMode={'moveTo'}
        />
      )}
    </>
  );
};

const AdventurePathView = (): JSX.Element => {
  const {mapboxStyleKey} = useTokenStateContext();
  const {workingPath, currentAdventure} = useAdventureStateContext();

  const images = {
    ski: skierIcon,
    climb: climberIcon,
    hike: hikerIcon,
  };

  return (
    <MapView
      style={{flex: 1}}
      styleURL={mapboxStyleKey as string}
      logoEnabled={false}
      // scrollEnabled={false}
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
      {workingPath?.length && currentAdventure?.path ? (
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
              lineColor: pathColor(currentAdventure?.adventure_type),
              lineWidth: 5,
              lineJoin: 'round',
              lineCap: 'round',
            }}
          />
        </ShapeSource>
      ) : (
        <>
          <Images images={images} />
          <ShapeSource
            id="pointSource"
            shape={{
              type: 'Feature',
              properties: {
                icon: currentAdventure?.adventure_type as string,
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  currentAdventure?.coordinates.lng as number,
                  currentAdventure?.coordinates.lat as number,
                ],
              },
            }}>
            <SymbolLayer id="pointLayer" style={MapboxStyles.mapboxIcon} />
          </ShapeSource>
        </>
      )}
    </MapView>
  );
};

const MapboxStyles = {
  mapboxIcon: {
    iconImage: ['get', 'icon'],
    iconSize: 0.4,
  },
};

export default AdventurePathView;
