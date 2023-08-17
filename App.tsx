/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Connections,
  SundayPeakProviders,
} from '@amaclean2/sundaypeak-treewells';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContent from './Components/Navigation/AppContent';

Connections.setConnections(
  {
    restUrl: 'https://api.sundaypeak.com',
    websocketUrl: 'wss://api.sundaypeak.com/ws',
  },
  AsyncStorage,
);

const App = (): JSX.Element => {
  return (
    <SundayPeakProviders>
      <AppContent />
    </SundayPeakProviders>
  );
};

export default App;
