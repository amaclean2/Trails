import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import {useDebounce, useGetUser} from '@amaclean2/sundaypeak-treewells';
import SearchField from '../Reusable/SearchField';

const FriendsList = ({navigation, route}: any): JSX.Element => {
  const {getNonLoggedInUser, searchForUsers} = useGetUser();
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);

  const getSearchResults = useDebounce(search => {
    if (search.length <= 3) {
      return setSearchList([]);
    }

    searchForUsers({search}).then(users => {
      setSearchList(users);
    });
  });

  const handleChangeSearch = (text = '') => {
    setSearchText(text);
    getSearchResults(text);
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <SearchField
            placeholder={'Search for Friends'}
            value={searchText}
            onChangeText={handleChangeSearch}
          />
        }
        data={searchList.length ? searchList : route.params.friends}
        style={localStyles.listHeader}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              getNonLoggedInUser({userId: item.user_id});
              navigation.navigate('OtherProfile', {
                name: item.display_name,
                userId: item.user_id,
              });
            }}
            style={generalStyles.listItem}>
            {![null, undefined, ''].includes(item.profile_picture_url) ? (
              <Image
                style={generalStyles.listImage}
                source={{uri: item.profile_picture_url}}
              />
            ) : (
              <View style={generalStyles.listImage} />
            )}
            <Text style={generalStyles.listText}>{item.display_name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  profileSpaceholder: {},
  listHeader: {
    marginTop: 20,
  },
});

export default FriendsList;
