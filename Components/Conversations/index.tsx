import {
  useDebounce,
  useGetUser,
  useMessages,
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {generalStyles} from '../GeneralStyles';
import SearchField from '../Reusable/SearchField';
import {colors} from '../../Assets/Colors';
import {RootStackParamsList} from '../Navigation/AppContent';
import SwipeableItem from './SwipeableItem';

const Conversations = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'ConversationSelector'>) => {
  const {conversations} = useMessagingStateContext();
  const {loggedInUser} = useUserStateContext();
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const {addConversation} = useMessages();
  const {searchForFriends} = useGetUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${loggedInUser?.first_name} ${loggedInUser?.last_name}`,
    });
  }, []);

  const getSearchResults = useDebounce(search => {
    if (search.length <= 3) return setSearchList([]);

    searchForFriends({search}).then(users => {
      setSearchList(users);
    });
  });

  const handleChangeSearch = (text = '') => {
    setSearchText(text);
    getSearchResults(text);
  };

  const buildList = () => {
    if (searchList?.length) {
      return (
        <FlatList
          ListHeaderComponent={
            <SearchField
              placeholder={'Search among your friends'}
              value={searchText}
              onChangeText={handleChangeSearch}
            />
          }
          data={searchList}
          contentContainerStyle={localStyles.users}
          renderItem={({
            item,
          }: {
            item: {
              user_id: number;
              display_name: string;
              profile_picture_url: string;
            };
          }) => (
            <Pressable
              style={[generalStyles.listItem, localStyles.listItem]}
              onPress={() => {
                setSearchText('');
                setSearchList([]);
                addConversation({userId: item.user_id});
                navigation.navigate('ConversationView', {
                  conversationName: item.display_name,
                });
              }}>
              <Image
                source={{uri: item.profile_picture_url}}
                style={generalStyles.listImage}
              />
              <Text style={generalStyles.listText}>{item.display_name}</Text>
            </Pressable>
          )}
        />
      );
    } else {
      return (
        <FlatList
          ListHeaderComponent={
            <SearchField
              placeholder={'Search among your friends'}
              value={searchText}
              onChangeText={handleChangeSearch}
            />
          }
          data={Object.values(conversations ?? {})}
          contentContainerStyle={localStyles.users}
          keyExtractor={item => `${item.conversation_id}`}
          renderItem={({item}) => (
            <SwipeableItem navigation={navigation} item={item} />
          )}
        />
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={generalStyles.fullScreenView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={generalStyles.fullScreenView}>
          {buildList()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  listText: {
    fontWeight: '600',
    fontSize: 18,
  },
  contactList: {
    paddingTop: 15,
  },
  users: {
    paddingTop: 20,
  },
  conversationIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  listItemTextContent: {
    flexDirection: 'column',
    gap: 5,
  },
  unreadButton: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: colors.primaryAccentColor,
  },
});

export default Conversations;
