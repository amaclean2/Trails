import React, {useEffect} from 'react';
import {
  useAdventureStateContext,
  useGetAdventures,
} from '@amaclean2/sundaypeak-treewells';
import HikeAdventureView from './HikeAdventureView';
import ClimbAdventureView from './ClimbAdventureView';
import SkiAdventureView from './SkiAdventureView';
import {SafeAreaView, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../Navigation/AppContent';

const AdventureViews = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamsList, 'Adventures'>): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {getAdventure} = useGetAdventures();

  useEffect(() => {
    if (route?.params?.adventureType && route?.params?.adventureId) {
      getAdventure({
        id: route.params.adventureId,
        type: route.params.adventureType,
      });
    }
  }, [route.params]);

  if (!currentAdventure) {
    return (
      <SafeAreaView>
        <Text>Adventure Loading...</Text>
      </SafeAreaView>
    );
  }

  switch (currentAdventure?.adventure_type) {
    case 'hike':
      return <HikeAdventureView navigation={navigation} />;
    case 'climb':
      return <ClimbAdventureView navigation={navigation} />;
    default:
      return <SkiAdventureView navigation={navigation} />;
  }
};

export default AdventureViews;
