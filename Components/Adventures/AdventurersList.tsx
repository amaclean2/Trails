import React from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import {useAdventureStateContext} from '@amaclean2/sundaypeak-treewells';

const AdventurersList = (): JSX.Element => {
  const {currentAdventure} = useAdventureStateContext();
  return (
    <View>
      <FlatList
        data={currentAdventure?.todo_users}
        renderItem={({item}) => (
          <Pressable
            style={styles.listItem}
            onPress={() => console.log({item})}>
            <Image
              style={styles.listImage}
              source={{uri: item.profile_picture_url ?? ''}}
            />
            <Text style={styles.listText}>{item.display_name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default AdventurersList;
