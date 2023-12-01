import React, {useEffect, useState} from 'react';
import {
  ActionSheetIOS,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Meatball} from '../../Assets/UIGlyphs/Meatball';
import {usePictures} from '@amaclean2/sundaypeak-treewells';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Navigation/AppContent';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ImageViewer = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamsList, 'ImageViewer'>) => {
  const {deletePicture} = usePictures();
  const [scrollIndex, setScrollIndex] = useState(route.params?.imageIndex ?? 0);

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
            deletePicture({url: route.params?.images[scrollIndex]});
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
    <FlatList
      horizontal
      initialScrollIndex={route.params?.imageIndex}
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: SCREEN_WIDTH,
        offset: SCREEN_WIDTH * index,
        index,
      })}
      data={route.params?.images}
      onScroll={props => {
        const offset = props.nativeEvent.contentOffset.x;
        if (offset % SCREEN_WIDTH === 0) {
          setScrollIndex(offset / SCREEN_WIDTH);
        }
      }}
      scrollEventThrottle={0}
      keyExtractor={item => item}
      snapToInterval={SCREEN_WIDTH}
      snapToAlignment="center"
      decelerationRate="fast"
      pagingEnabled={true}
      renderItem={({item}) => (
        <View>
          <Image
            source={{uri: item.replace('/thumbs', '')}}
            style={localStyles.image}
          />
        </View>
      )}
    />
  );
};

const localStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    // alignItems: 'stretch',
  },
  image: {
    flex: 1,
    width: SCREEN_WIDTH,
    resizeMode: 'contain',
  },
});

export default ImageViewer;
