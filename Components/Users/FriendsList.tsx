import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {generalStyles} from '../GeneralStyles';
import {useGetUser} from '@amaclean2/sundaypeak-treewells';

const FriendsList = ({navigation, route}: any): JSX.Element => {
  const {getNonLoggedInUser} = useGetUser();

  return (
    <View>
      <FlatList
        data={route.params.friends}
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
});

export default FriendsList;
