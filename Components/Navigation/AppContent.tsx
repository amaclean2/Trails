import React from 'react';
import Mapbox from '../Mapping/Mapbox';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserProfile from '../Users';
import Conversations from '../Conversations';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useUserStateContext} from '@amaclean2/sundaypeak-treewells';
import ExternalViews from '../External';
import OtherUser from '../Users/OtherUser';
import {colors} from '../../Assets/Colors';
import FriendsList from '../Users/FriendsList';
import AdventuresList from '../Users/AdventuresList';
import Adventurers from '../Adventures/Adventurers';
import AdventureViews from '../Adventures/Views';
import DefaultAdventure from '../Adventures';
import ImageViewer from '../Reusable/ImageViewer';

const {Navigator, Screen} = createBottomTabNavigator();
const {Navigator: StackNavigator, Screen: StackScreen} =
  createNativeStackNavigator();

const defaultHeaderOptions = {
  headerTintColor: colors.primaryAccentColor,
};

const AdventureStack = (): JSX.Element => {
  return (
    <StackNavigator screenOptions={{headerShown: false}}>
      <StackScreen
        name={'DefaultAdventure'}
        component={DefaultAdventure}
        options={{
          ...defaultHeaderOptions,
          headerShown: false,
          title: 'Adventure View',
        }}
      />
      <StackScreen
        name={'Adventures'}
        component={AdventureViews}
        options={{
          ...defaultHeaderOptions,
          headerShown: false,
          title: 'Adventure View',
        }}
      />
      <StackScreen
        name={'Adventurers'}
        component={Adventurers}
        options={{
          ...defaultHeaderOptions,
          headerShown: true,
          title: 'Todo List',
        }}
      />
      <StackScreen
        name={'OtherProfile'}
        component={OtherUser}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerTitle: route.params?.name,
          headerShown: true,
        })}
      />
      <StackScreen
        name={'FriendsList'}
        component={FriendsList}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: 'Connections',
          headerBackTitle: route.params?.backName,
        })}
      />
      <StackScreen
        name={'AdventuresList'}
        component={AdventuresList}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: 'Adventures',
          headerBackTitle: route.params?.backName,
        })}
      />
      <StackScreen
        name={'ImageViewer'}
        component={ImageViewer}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: route.params?.adventureTitle,
        })}
      />
    </StackNavigator>
  );
};

const UserStack = (): JSX.Element => {
  return (
    <StackNavigator screenOptions={{headerShown: false}}>
      <StackScreen
        name={'Profile'}
        component={UserProfile}
        options={{...defaultHeaderOptions, headerShown: false}}
      />
      <StackScreen
        name={'FriendsList'}
        component={FriendsList}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: 'Connections',
          headerBackTitle: route.params?.backName,
        })}
      />
      <StackScreen
        name={'OtherProfile'}
        component={OtherUser}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerTitle: route.params?.name,
          headerShown: true,
          headerBackTitle: route.params?.backName,
        })}
      />
      <StackScreen
        name={'AdventuresList'}
        component={AdventuresList}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: 'Adventures',
          headerBackTitle: route.params?.backName,
        })}
      />
      <StackScreen
        name={'ImageViewer'}
        component={ImageViewer}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: route.params?.userName,
        })}
      />
    </StackNavigator>
  );
};

const AppContent = (): JSX.Element => {
  const {loggedInUser} = useUserStateContext();
  if (!loggedInUser) {
    return <ExternalViews />;
  }

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
        name="UserStack"
        component={UserStack}
        options={{headerShown: false, title: 'Profile'}}
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
