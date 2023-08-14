import React from 'react';
import {Text, View} from 'react-native';
import {useTokenStateContext} from '@amaclean2/sundaypeak-treewells';

const AppContent = (): JSX.Element => {
  const {mapboxToken} = useTokenStateContext();

  return (
    <View>
      <Text>{mapboxToken}</Text>
    </View>
  );
};

export default AppContent;
