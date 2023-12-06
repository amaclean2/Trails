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
  View,
} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import SearchField from '../Reusable/SearchField';
import {colors} from '../../Assets/Colors';
import FlexSpacer from '../Reusable/FlexSpacer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Navigation/AppContent';

const Conversations = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'ConversationSelector'>) => {
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
          renderItem={({item}) => (
            <Pressable
              style={[generalStyles.listItem, localStyles.listItem]}
              onPress={() => {
                getConversation({conversationId: item.conversation_id});
                navigation.navigate('ConversationView', {
                  conversationName: buildConversationName(item),
                });
              }}>
              <Image
                source={{
                  uri:
                    item.users.find(user => user.user_id !== loggedInUser?.id)
                      ?.profile_picture_url ?? '',
                }}
                style={localStyles.conversationIcon}
              />
              <View style={localStyles.listItemTextContent}>
                <Text style={[generalStyles.listText, localStyles.listText]}>
                  {buildConversationName(item)}
                </Text>
                <Text numberOfLines={1} style={{maxWidth: 240, fontSize: 16}}>
                  {item.last_message}
                </Text>
              </View>
              <FlexSpacer />
              {item.unread && <View style={localStyles.unreadButton} />}
            </Pressable>
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
