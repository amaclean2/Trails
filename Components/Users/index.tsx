import React from 'react';
import {Button, Text, View} from 'react-native';

const UserProfile = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Text>UserProfile</Text>
      <Button
        title={'Explore the map'}
        onPress={() => navigation.navigate('Explore')}
      />
    </View>
  );
};

export default UserProfile;
