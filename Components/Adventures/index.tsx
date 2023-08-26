import React, {useEffect} from 'react';
import {
  useAdventureStateContext,
  useGetAdventures,
} from '@amaclean2/sundaypeak-treewells';
import {Text, View} from 'react-native';
import SkiAdventureView from './SkiAdventureView';

type LocalAdventureChoiceType = 'hike' | 'ski' | 'climb';

const AdventureView = ({navigation, route}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {getAdventure} = useGetAdventures();

  useEffect(() => {
    if (route?.params?.adventureType && route?.params?.adventureId) {
      getAdventure({
        id: route.params.adventureId,
        type: route.params.adventureType as LocalAdventureChoiceType,
      });
    }
  }, [route.params]);

  return (
    <>
      {currentAdventure ? (
        <SkiAdventureView navigation={navigation} />
      ) : (
        <View>
          <Text>No current adventure</Text>
        </View>
      )}
    </>
  );
};

export default AdventureView;
