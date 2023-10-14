import React from 'react';
import Mapbox from '../Mapping/Mapbox';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserProfile from '../Users';
import Conversations from '../Conversations';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useUserStateContext} from '@amaclean2/sundaypeak-treewells';
import OtherUser from '../Users/OtherUser';
import {colors} from '../../Assets/Colors';
import FriendsList from '../Users/FriendsList';
import AdventuresList from '../Users/AdventuresList';
import Adventurers from '../Adventures/Adventurers';
import AdventureViews from '../Adventures/Views';
import DefaultAdventure from '../Adventures';
import ImageViewer from '../Reusable/ImageViewer';
import EditUser from '../Users/EditUser';
import AdventureEditor from '../Adventures/Editors';
import AdventureMap from '../Mapping/AdventureMap';
import TabBar from './TabBar';
import ConversationView from '../Conversations/ConversationView';
import ForgotPassword from '../External/ForgotPassword';
import Login from '../External/Login';
import Signup from '../External/Signup';

const {Navigator: TabNavigator, Screen: TabScreen} = createBottomTabNavigator();
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
          title: 'Adventure',
        }}
      />
      <StackScreen
        name={'Adventures'}
        component={AdventureViews}
        options={{
          ...defaultHeaderOptions,
          headerShown: false,
          title: 'Adventure',
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
      <StackScreen
        name={'AdventureEditor'}
        component={AdventureEditor}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: route.params?.adventureTitle,
        })}
      />
      <StackScreen
        name="AdventureMap"
        component={AdventureMap}
        options={({route}) => ({
          headerShown: true,
          headerTitle: route.params?.adventureName,
          headerBackTitle: 'Adventure',
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
      <StackScreen
        name={'EditUser'}
        component={EditUser}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: route.params?.userName,
        })}
      />
    </StackNavigator>
  );
};

const ExploreStack = (): JSX.Element => {
  return (
    <StackNavigator screenOptions={{headerShown: false}}>
      <StackScreen
        name={'Explore'}
        component={Mapbox}
        options={{headerShown: false, title: 'Explore'}}
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
      <StackScreen
        name={'AdventureEditor'}
        component={AdventureEditor}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: route.params?.adventureTitle,
        })}
      />
      <StackScreen
        name="AdventureMap"
        component={AdventureMap}
        options={({route}) => ({
          headerShown: true,
          headerTitle: route.params?.adventureName,
          headerBackTitle: 'Adventure',
        })}
      />
    </StackNavigator>
  );
};

const AppTabs = (): JSX.Element => {
  return (
    <TabNavigator tabBar={props => <TabBar {...props} />}>
      <TabScreen
        name="ExploreStack"
        component={ExploreStack}
        options={{headerShown: false, title: 'Explore'}}
      />
      <TabScreen
        name="AdventureStack"
        component={AdventureStack}
        options={{headerShown: false, title: 'Adventures'}}
      />
      <TabScreen
        name={'ConversationSelector'}
        component={Conversations}
        options={{
          ...defaultHeaderOptions,
          title: 'Conversations',
          headerShown: true,
        }}
      />
      <TabScreen
        name="UserStack"
        component={UserStack}
        options={{headerShown: false, title: 'Profile'}}
      />
    </TabNavigator>
  );
};

const AppContent = (): JSX.Element => {
  return (
    <StackNavigator>
      <StackScreen
        name={'Login'}
        component={Login}
        options={{headerShown: false}}
      />
      <StackScreen
        name={'AppTabs'}
        component={AppTabs}
        options={{headerShown: false}}
      />
      <StackScreen
        name={'ConversationView'}
        component={ConversationView}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: route.params?.conversationName,
        })}
      />
      <StackScreen
        name={'ForgotPassword'}
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <StackScreen
        name={'SignUp'}
        component={Signup}
        options={{headerShown: false}}
      />
    </StackNavigator>
  );
};

export default AppContent;
