import React from 'react';
import Mapbox from '../Mapping/Mapbox';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AdventureView from '../Adventures';
import UserProfile from '../Users';
import Conversations from '../Conversations';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdventurersList from '../Adventures/AdventurersList';
const {Navigator, Screen} = createBottomTabNavigator();
const {Navigator: StackNavigator, Screen: StackScreen} =
  createNativeStackNavigator();

const AdventureStack = (): JSX.Element => {
  return (
    <StackNavigator screenOptions={{headerShown: false}}>
      <StackScreen
        name={'Adventures'}
        component={AdventureView}
        options={{headerShown: false}}
      />
      <StackScreen
        name={'Adventurers'}
        component={AdventurersList}
        options={{headerShown: true}}
      />
    </StackNavigator>
  );
};

const AppContent = (): JSX.Element => {
  return (
    <Navigator>
      <Screen
        name="Explore"
        component={Mapbox}
        options={{headerShown: false}}
      />
      <Screen
        name="AdventureStack"
        component={AdventureStack}
        options={{headerShown: false, title: 'Adventures'}}
      />
      <Screen
        name="Profile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Screen
        name="Conversations"
        component={Conversations}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default AppContent;
