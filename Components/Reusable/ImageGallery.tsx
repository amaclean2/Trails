import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Exif from 'react-native-exif';

import {colors} from '../../Assets/Colors';

const ImageGallery = ({
  navigation,
  images,
  source,
  backName,
  onAddPicture,
}: {
  navigation: any;
  images: any[];
  source: 'User' | 'Adventure';
  backName: string;
  onAddPicture: (() => void) | undefined;
}): JSX.Element => {
  const [formattedImages, setFormattedImages] = useState([]);

  useEffect(() => {
    const imagePromises = images.map(image => {
      return new Promise(res => {
        Image.getSize(image, (width, height) => {
          res({url: image, ar: width / height});
        });
      });
    });

    Promise.all(imagePromises).then(responses => {
      setFormattedImages(responses);
    });
  }, [images]);

  return (
    <FlatList
      data={
        onAddPicture !== undefined
          ? [...formattedImages, {ar: -1, url: ''}]
          : formattedImages
      }
      horizontal
      style={localStyles.picturesContainer}
      ItemSeparatorComponent={() => <View style={{width: 5}} />}
      renderItem={({item: image, index}) =>
        image.ar === -1 ? (
          <Pressable style={localStyles.addImageButton} onPress={onAddPicture}>
            <Text>Add Photo</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              if (source === 'User') {
                return navigation.navigate('ImageViewer', {
                  images,
                  imageIndex: index,
                  userName: backName,
                });
              } else {
                return navigation.navigate('ImageViewer', {
                  images,
                  imageIndex: index,
                  adventureTitle: backName,
                });
              }
            }}
            style={localStyles.picture}>
            <Image
              style={[localStyles.picture, {aspectRatio: image.ar}]}
              source={{uri: image.url}}
            />
          </Pressable>
        )
      }
    />
  );
};

const localStyles = StyleSheet.create({
  picturesContainer: {
    height: 100,
    marginVertical: 15,
    gap: 5,
  },
  picture: {
    height: 100,
    flex: 1,
    backgroundColor: 'transparent',
  },
  addImageButton: {
    borderColor: colors.borderColor,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    height: 90,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default ImageGallery;
