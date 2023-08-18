import React from 'react';
import {Button, Text, View} from 'react-native';

const Conversations = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Text>Conversations</Text>
      <Button
        title={'View your profile'}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default Conversations;
