import {
  useDebounce,
  useGetUser,
  useMessages,
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import React, {useEffect, useRef, useState} from 'react';
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {generalStyles} from '../GeneralStyles';
import SearchField from '../Reusable/SearchField';
import {colors} from '../../Assets/Colors';
import {RootStackParamsList} from '../Navigation/AppContent';
import SwipeableItem from './SwipeableItem';
import FlexSpacer from '../Reusable/FlexSpacer';
import {CheckboxIcon, EmptyCheckboxIcon} from '../../Assets/UIGlyphs/Checkbox';
import ConversationPills from './ConversationPills';

type UserType = {
  display_name: string;
  user_id: number;
  profile_picture_url: string;
};

const Conversations = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'ConversationSelector'>) => {
  const {conversations} = useMessagingStateContext();
  const {loggedInUser} = useUserStateContext();
  const {addConversation} = useMessages();
  const {searchForFriends} = useGetUser();

  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [conversationList, setConversationList] = useState<number[]>([]);

  const newConversationName = useRef<any | null>(null);

  useEffect(() => {
    if (conversationList.length) {
      navigation.setOptions({
        // eslint-disable-next-line
        headerRight: () => (
          <Pressable
            style={{paddingEnd: 12}}
            onPress={() => {
              const assembledConversationName = loggedInUser?.friends
                .reduce((convoName: string[], friend) => {
                  if (conversationList.includes(friend.user_id)) {
                    return [...convoName, friend.display_name];
                  } else {
                    return convoName;
                  }
                }, [])
                .join(', ');

              addConversation({userIds: conversationList});
              navigation.navigate('ConversationView', {
                conversationName: assembledConversationName,
              });
              newConversationName.current = assembledConversationName;
              setConversationList([]);
            }}>
            <Text style={{color: colors.primaryAccentColor, fontSize: 18}}>
              Create
            </Text>
          </Pressable>
        ),
      });
    }
  }, [conversationList.length]);

  const getSearchResults = useDebounce(search => {
    if (search.length <= 3) {
      return setSearchList([]);
    }

    searchForFriends({search}).then(users => {
      setSearchList(users);
    });
  });

  const handleChangeSearch = (text = '') => {
    setSearchText(text);
    getSearchResults(text);
  };

  const buildList = () => {
    if (searchList?.length || conversationList.length) {
      return (
        <FlatList
          ListHeaderComponent={
            <View>
              <SearchField
                placeholder={'Search conversations'}
                value={searchText}
                onChangeText={handleChangeSearch}
              />
              <ConversationPills
                conversationList={conversationList}
                removeItem={(id: number) => {
                  const tempConvoList = [...conversationList];
                  tempConvoList.splice(id, 1);
                  setConversationList(tempConvoList);
                }}
              />
            </View>
          }
          data={searchList.length ? searchList : loggedInUser?.friends}
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
                if (conversationList.includes(item.user_id)) {
                  const idx = conversationList.findIndex(
                    id => id === item.user_id,
                  );
                  console.log({idx});
                  const tempConvoList = [...conversationList];
                  tempConvoList.splice(idx, 1);
                  setConversationList(tempConvoList);
                } else {
                  setConversationList([...conversationList, item.user_id]);
                }
              }}>
              <Image
                source={{uri: item.profile_picture_url}}
                style={generalStyles.listImage}
              />
              <Text style={generalStyles.listText}>{item.display_name}</Text>
              <FlexSpacer />
              {conversationList.includes(item.user_id) ? (
                <CheckboxIcon color={colors.primaryAccentColor} />
              ) : (
                <EmptyCheckboxIcon color={colors.mainOffDark} />
              )}
            </Pressable>
          )}
        />
      );
    } else {
      return (
        <FlatList
          ListHeaderComponent={
            <SearchField
              placeholder={'Search conversations'}
              value={searchText}
              onChangeText={handleChangeSearch}
            />
          }
          data={Object.values(conversations ?? {})}
          contentContainerStyle={localStyles.users}
          keyExtractor={item => `${item.conversation_id}`}
          renderItem={({item}) => {
            if (
              newConversationName &&
              item.users.find(({display_name}) => display_name === undefined)
            ) {
              item.conversation_name = newConversationName.current;
            } else {
              newConversationName.current = null;
            }

            return <SwipeableItem navigation={navigation} item={item} />;
          }}
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
