import React from 'react';
import {
  Connections,
  SundayPeakProviders,
} from '@amaclean2/sundaypeak-treewells';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import AppContent from './Components/Navigation/AppContent';
import {LogBox} from 'react-native';

Connections.setConnections(
  {
    restUrl: 'https://api.sundaypeak.com',
    websocketUrl: 'wss://api.sundaypeak.com',
    platform: 'mobile',
  },
  AsyncStorage,
);

LogBox.ignoreAllLogs();

const App = (): JSX.Element => {
  return (
    <SundayPeakProviders>
      <NavigationContainer linking={{prefixes: ['sp://app']}}>
        <AppContent />
      </NavigationContainer>
    </SundayPeakProviders>
  );
};

export default App;
