import React from 'react';
import {Text} from 'react-native';

const CustomConversationHeader = ({name = '', image = ''}) => {
  return <Text>{name}</Text>;
};

export default CustomConversationHeader;
