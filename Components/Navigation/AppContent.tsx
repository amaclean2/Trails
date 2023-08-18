import React from 'react';
import Mapbox from '../Mapping/Mapbox';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdventureView from '../Adventures';
import UserProfile from '../Users';
import Conversations from '../Conversations';
const {Navigator, Screen} = createBottomTabNavigator();

const AppContent = (): JSX.Element => {
  return (
    <Navigator>
      <Screen name="Explore" component={Mapbox} options={{title: 'Explore'}} />
      <Screen
        name="Adventures"
        component={AdventureView}
        options={{title: 'Adventures'}}
      />
      <Screen
        name="Profile"
        component={UserProfile}
        options={{title: 'User Profile'}}
      />
      <Screen
        name="Conversations"
        component={Conversations}
        options={{title: 'Conversations'}}
      />
    </Navigator>
  );
};

export default AppContent;
