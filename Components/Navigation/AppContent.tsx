import React from 'react';
import {View} from 'react-native';
import Mapbox from '../Mapping/Mapbox';

const AppContent = (): JSX.Element => {
  return (
    <View>
      <Mapbox />
    </View>
  );
};

export default AppContent;
