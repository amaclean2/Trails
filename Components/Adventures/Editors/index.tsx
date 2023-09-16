import React from 'react';
import {useAdventureStateContext} from '@amaclean2/sundaypeak-treewells';
import HikeAdventureEditor from './HikeAdventureEditor';
import ClimbAdventureEditor from './ClimbAdventureEditor';
import SkiAdventureEditor from './SkiAdventureEditor';

const AdventureEditor = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();

  switch (currentAdventure?.adventure_type) {
    case 'hike':
      return <HikeAdventureEditor navigation={navigation} />;
    case 'climb':
      return <ClimbAdventureEditor navigation={navigation} />;
    default:
      return <SkiAdventureEditor navigation={navigation} />;
  }
};

export default AdventureEditor;
