import React from 'react';
import {useAdventureStateContext} from '@amaclean2/sundaypeak-treewells';
import HikeAdventureView from './HikeAdventureView';
import ClimbAdventureView from './ClimbAdventureView';
import SkiAdventureView from './SkiAdventureView';

const AdventureViews = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();

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
