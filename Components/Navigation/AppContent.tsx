import React, {useMemo, useRef} from 'react';
import Mapbox from '../Mapping/Mapbox';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserProfile from '../Users';
import Conversations from '../Conversations';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
import CreateAdventure from '../Adventures/CreateAdventure';
import CreateAdventureMap from '../Adventures/CreateAdventureMap';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AddUserFlow, {AddUserFooter} from '../Conversations/AddUserFlow';
import {StyleSheet, View} from 'react-native';

const {Navigator: TabNavigator, Screen: TabScreen} = createBottomTabNavigator();
const {Navigator: StackNavigator, Screen: StackScreen} =
  createNativeStackNavigator();

const defaultHeaderOptions = {
  headerTintColor: colors.primaryAccentColor,
  headerBackTitleVisible: false,
};

export type RootStackParamsList = {
  Login: any;
  SignUp: any;
  ForgotPassword: any;
  ConversationView: any;
  DefaultAdventureView: any;
  Adventures: any;
  Adventurers: any;
  OtherProfile: any;
  FriendsList: any;
  AdventuresList: any;
  ImageViewer: any;
  AdventureEditor: any;
  AdventureMap: any;
  Profile: any;
  EditUser: any;
  Explore: any;
  ConversationSelector: any;
  CreateAdventureView: any;
  CreateAdventureMap: any;
};

const AdventureStack = (): JSX.Element => {
  return (
    <StackNavigator screenOptions={{headerShown: false}}>
      <StackScreen
        name={'DefaultAdventureView'}
        component={DefaultAdventure}
        options={{
          ...defaultHeaderOptions,
          headerShown: false,
          title: 'Adventure',
        }}
      />
      <StackScreen
        name={'CreateAdventureView'}
        component={CreateAdventure}
        options={{
          ...defaultHeaderOptions,
          headerShown: true,
          title: 'Create Adventure',
        }}
      />
      <StackScreen
        name={'CreateAdventureMap'}
        component={CreateAdventureMap}
        options={{
          ...defaultHeaderOptions,
          headerShown: true,
          title: 'Create Adventure',
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
          headerBackTitleVisible: true,
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
          headerBackTitleVisible: true,
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
          headerBackTitleVisible: true,
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
          ...defaultHeaderOptions,
          headerShown: true,
          headerTitle: route.params?.adventureName,
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
          headerBackTitleVisible: true,
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
          headerBackTitleVisible: true,
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
          headerBackTitleVisible: true,
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
  const sheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['65%', '95%'], []);

  return (
    <>
      <StackNavigator>
        <StackScreen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />
        <StackScreen
          name={'SignUp'}
          component={Signup}
          options={{headerShown: false}}
        />
        <StackScreen
          name={'AppTabs'}
          component={AppTabs}
          options={{headerShown: false}}
        />
        <StackScreen
          name={'ForgotPassword'}
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <StackScreen
          name={'ConversationView'}
          options={({route}) => ({
            ...defaultHeaderOptions,
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: route.params?.conversationName,
          })}>
          {props => (
            <ConversationView
              {...props}
              openModal={() => sheetRef.current?.present()}
            />
          )}
        </StackScreen>
      </StackNavigator>
      <BottomSheetModal
        ref={sheetRef}
        index={1}
        keyboardBehavior={'extend'}
        snapPoints={snapPoints}
        // footerComponent={AddUserFooter}
        backdropComponent={() => (
          <View style={localStyles.bottomSheetBackground} />
        )}>
        <AddUserFlow dismiss={() => sheetRef.current.dismiss()} />
      </BottomSheetModal>
    </>
  );
};

const localStyles = StyleSheet.create({
  bottomSheetBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.mainOffDarkOpacity,
  },
});

export default AppContent;
