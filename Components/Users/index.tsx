import React from 'react';
import {Button, Text, View} from 'react-native';
import {Meatball} from '../../Assets/UIGlyphs/Meatball';

const UserProfile = ({navigation}: {navigation: any}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Text>UserProfile</Text>
      <Button
        title={'Explore the map'}
        onPress={() => navigation.navigate('Explore')}
      />
      <Meatball />
    </View>
  );
};

export default UserProfile;
