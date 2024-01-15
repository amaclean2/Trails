import React from 'react';
import {
  Connections,
  SundayPeakProviders,
} from '@amaclean2/sundaypeak-treewells';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import AppContent from './Components/Navigation/AppContent';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

Connections.setConnections(
  {
    restUrl: 'https://api.sundaypeak.com',
    websocketUrl: 'wss://api.sundaypeak.com',
    platform: 'native',
  },
  AsyncStorage,
);

LogBox.ignoreAllLogs();

const App = (): JSX.Element => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SundayPeakProviders>
        <BottomSheetModalProvider>
          <NavigationContainer linking={{prefixes: ['sp://app']}}>
            <AppContent />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </SundayPeakProviders>
    </GestureHandlerRootView>
  );
};

export default App;
