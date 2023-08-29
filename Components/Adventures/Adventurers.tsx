import React from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {
  useAdventureStateContext,
  useGetUser,
} from '@amaclean2/sundaypeak-treewells';

import {generalStyles} from '../GeneralStyles';

const Adventurers = ({navigation}: any): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  const {getNonLoggedInUser} = useGetUser();

  return (
    <View>
      <FlatList
        data={currentAdventure?.todo_users}
        renderItem={({item}) => (
          <Pressable
            style={generalStyles.listItem}
            onPress={() => {
              getNonLoggedInUser({userId: item.user_id});
              navigation.navigate('AdventureStack', {
                screen: 'OtherProfile',
                params: {name: item.display_name, userId: item.user_id},
              });
            }}>
            <Image
              style={generalStyles.listImage}
              source={{uri: item.profile_picture_url ?? ''}}
            />
            <Text style={generalStyles.listText}>{item.display_name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Adventurers;
