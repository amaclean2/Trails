import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  useDebounce,
  useGetUser,
  useMessages,
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {BottomSheetFlatList, BottomSheetFooter} from '@gorhom/bottom-sheet';
import {generalStyles} from '../GeneralStyles';
import {colors} from '../../Assets/Colors';
import SearchField from '../Reusable/SearchField';

type SearchUserType = {};

export const AddUserFooter = props => {
  return (
    <BottomSheetFooter
      {...props}
      bottomInset={0}
      style={{alignItems: 'center', backgroundColor: colors.mainOffWhite}}>
      <Pressable style={generalStyles.button}>
        <Text style={generalStyles.buttonText}>Add User to Conversation</Text>
      </Pressable>
    </BottomSheetFooter>
  );
};

const AddUserFlow = ({dismiss}: any) => {
  const {loggedInUser} = useUserStateContext();
  const {addUserToConversation} = useMessages();
  const {currentConversationId, conversations} = useMessagingStateContext();
  const {searchForFriends} = useGetUser();

  const currentConversationUsers = conversations?.[
    currentConversationId as number
  ].users.map(({user_id}) => user_id);

  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState<SearchUserType[]>([]);

  const getSearchResults = useDebounce(search => {
    if (search.length <= 3) {
      return setSearchList([]);
    }

    searchForFriends({search}).then((users: SearchUserType[]) => {
      setSearchList(users);
    });
  });

  const handleChangeSearch = (text = '') => {
    setSearchText(text);
    getSearchResults(text);
  };

  return (
    <BottomSheetFlatList
      ListHeaderComponent={() => (
        <View>
          <Text
            style={[
              generalStyles.headerText,
              localStyles.paddedItem,
              localStyles.headerText,
            ]}>
            Add Friends
          </Text>
          <SearchField
            placeholder={'Search friends'}
            value={searchText}
            onChangeText={handleChangeSearch}
            isBottomSheet
          />
        </View>
      )}
      data={searchList.length ? searchList : loggedInUser?.friends}
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={localStyles.flatListContainer}
      keyExtractor={i => i.user_id.toString()}
      renderItem={({item}) => {
        if (currentConversationUsers?.includes(item.user_id)) {
          return null;
        }

        return (
          <Pressable
            style={[localStyles.itemContainer, localStyles.paddedItem]}
            onPress={() => {
              addUserToConversation({
                userId: item.user_id,
                conversationId: currentConversationId,
              });
              dismiss();
            }}>
            <Image
              source={{uri: item.profile_picture_url}}
              style={localStyles.itemImage}
            />
            <Text style={localStyles.itemText}>{item.display_name}</Text>
          </Pressable>
        );
      }}
    />
  );
};

const localStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    minHeight: '100%',
  },
  paddedItem: {
    paddingHorizontal: 15,
  },
  flatListContainer: {
    gap: 15,
    paddingBottom: 10,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
  },
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  headerText: {
    marginBottom: 15,
  },
});

export default AddUserFlow;
