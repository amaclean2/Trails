import React, {useState} from 'react';
import {
  useAdventureStateContext,
  useSaveAdventure,
  useTokenStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {Camera, Images, MapView} from '@rnmapbox/maps';

import skierIcon from '../../Assets/Activities/SkierIcon.png';
import climberIcon from '../../Assets/Activities/ClimberIcon.png';
import hikerIcon from '../../Assets/Activities/HikerIcon.png';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../Assets/Colors';
import {generalStyles} from '../GeneralStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Navigation/AppContent';

type MapCenter = {
  latitude: number;
  longitude: number;
};

const CreateAdventureMap = ({
  navigation,
}: NativeStackScreenProps<
  RootStackParamsList,
  'CreateAdventureMap'
>): JSX.Element => {
  const {mapboxStyleKey} = useTokenStateContext();
  const {startPosition} = useAdventureStateContext();
  const {createNewDefaultAdventure} = useSaveAdventure();
  const [mapCenter, setMapCenter] = useState<MapCenter | null>(null);

  const handleCreateAdventure = () => {
    createNewDefaultAdventure({
      longitude: mapCenter?.longitude as number,
      latitude: mapCenter?.latitude as number,
    }).then(adventure => {
      navigation.navigate('Adventures', {
        adventureId: adventure.id,
        adventureType: adventure.adventure_type,
      });
    });
  };

  return (
    <>
      <MapView
        style={{flex: 1}}
        styleURL={mapboxStyleKey as string}
        logoEnabled={false}
        pitchEnabled={false}
        attributionEnabled={false}
        onMapIdle={({properties}) =>
          setMapCenter({
            latitude: properties.center[1],
            longitude: properties.center[0],
          })
        }
        scaleBarEnabled={false}>
        <Camera
          centerCoordinate={[
            startPosition?.longitude as number,
            startPosition?.latitude as number,
          ]}
          zoomLevel={14}
          animationMode={'moveTo'}
        />
      </MapView>
      <View style={localStyles.screenCenter} pointerEvents={'none'}>
        <View style={localStyles.crossHairs}>
          <View style={localStyles.crossHairsCenter} />
        </View>
      </View>
      <Pressable
        style={[generalStyles.button, localStyles.createButton]}
        onPress={handleCreateAdventure}>
        <Text style={generalStyles.buttonText}>Create</Text>
      </Pressable>
    </>
  );
};

const localStyles = StyleSheet.create({
  screenCenter: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  crossHairs: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.mainOffDark,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossHairsCenter: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.mainOffDark,
  },
  createButton: {
    position: 'absolute',
    marginBottom: 10,
    marginRight: 10,
    width: 'auto',
    paddingHorizontal: 20,
    bottom: 0,
    right: 0,
  },
});

export default CreateAdventureMap;
