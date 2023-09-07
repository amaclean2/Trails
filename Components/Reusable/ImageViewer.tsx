import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const ImageViewer = ({navigation, route}: any) => {
  return (
    <View style={localStyles.imageContainer}>
      <Image style={localStyles.image} source={{uri: route.params.image}} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    // alignItems: 'stretch',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default ImageViewer;
