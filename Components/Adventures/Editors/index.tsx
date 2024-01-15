import React from 'react';
import {useAdventureStateContext} from '@amaclean2/sundaypeak-treewells';
import HikeAdventureEditor from './HikeAdventureEditor';
import ClimbAdventureEditor from './ClimbAdventureEditor';
import SkiAdventureEditor from './SkiAdventureEditor';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../Navigation/AppContent';
import BikeAdventureEditor from './BikeAdventureEditor';

const AdventureEditor = ({
  navigation,
}: NativeStackScreenProps<
  RootStackParamsList,
  'AdventureEditor'
>): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();

  switch (currentAdventure?.adventure_type) {
    case 'hike':
      return <HikeAdventureEditor navigation={navigation} />;
    case 'climb':
      return <ClimbAdventureEditor navigation={navigation} />;
    case 'bike':
      return <BikeAdventureEditor navigation={navigation} />;
    default:
      return <SkiAdventureEditor navigation={navigation} />;
  }
};

export default AdventureEditor;
