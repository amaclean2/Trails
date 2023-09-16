import React, {useEffect} from 'react';
import {ActionSheetIOS, Image, Pressable, StyleSheet, View} from 'react-native';
import {Meatball} from '../../Assets/UIGlyphs/Meatball';
import {usePictures} from '@amaclean2/sundaypeak-treewells';

const ImageViewer = ({navigation, route}: any) => {
  const {deletePicture} = usePictures();

  const onMenuPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete Picture'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            deletePicture({url: route.params.image});
            navigation.goBack();
            break;
          default:
            console.log('canceled');
        }
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onMenuPress}>
          <Meatball />
        </Pressable>
      ),
    });
  }, []);

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
