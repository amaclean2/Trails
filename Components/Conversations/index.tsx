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
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import SearchField from '../Reusable/SearchField';

const Conversations = ({navigation}: any) => {
  const {conversations} = useMessagingStateContext();
  const {loggedInUser} = useUserStateContext();
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const {addConversation, getConversation} = useMessages();
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

  const buildConversationName = (conversation: any) => {
    if (conversation.conversation_name) {
      return conversation.conversation_name;
    } else {
      return (
        conversation.users?.find(
          ({user_id}: {user_id: number}) => user_id !== loggedInUser?.id,
        ).display_name || ''
      );
    }
  };

  const buildList = () => {
    if (searchList?.length) {
      return (
        <FlatList
          ListHeaderComponent={
            <SearchField
              placeholder={'Search'}
              value={searchText}
              onChangeText={handleChangeSearch}
            />
          }
          data={searchList}
          renderItem={({item}) => (
            <Pressable
              style={[generalStyles.listItem, localStyles.listItem]}
              onPress={() => {
                setSearchText('');
                setSearchList([]);
                addConversation({
                  userId: item.user_id,
                  name: item.display_name,
                });
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
          style={localStyles.contactList}
        />
      );
    } else {
      return (
        <FlatList
          ListHeaderComponent={
            <SearchField
              placeholder={'Search'}
              value={searchText}
              onChangeText={handleChangeSearch}
            />
          }
          data={Object.values(conversations ?? {})}
          renderItem={({item}) => (
            <Pressable
              style={[generalStyles.listItem, localStyles.listItem]}
              onPress={() => {
                getConversation({conversationId: item.conversation_id});
                navigation.navigate('ConversationView', {
                  conversationName: buildConversationName(item),
                });
              }}>
              <Text style={[generalStyles.listText, localStyles.listText]}>
                {buildConversationName(item)}
              </Text>
              <Text numberOfLines={1} style={{width: 300}}>
                {item.last_message}
              </Text>
            </Pressable>
          )}
          style={localStyles.contactList}
        />
      );
    }
  };

  return <SafeAreaView>{buildList()}</SafeAreaView>;
};

const localStyles = StyleSheet.create({
  listItem: {
    flexDirection: 'column',
    gap: 3,
    alignItems: 'flex-start',
  },
  listText: {
    fontWeight: '600',
  },
  contactList: {
    paddingTop: 15,
  },
});

export default Conversations;
