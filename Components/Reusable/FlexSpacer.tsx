import React from 'react';
import {StyleSheet, View} from 'react-native';

const FlexSpacer = ({height = 15}) => {
  return <View style={[localStyles.flexSpacer, {height}]} />;
};

const localStyles = StyleSheet.create({
  flexSpacer: {
    flex: 1,
  },
});

export default FlexSpacer;
