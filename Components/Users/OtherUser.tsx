import React, {useEffect} from 'react';
import {
  ActionSheetIOS,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useUserStateContext} from '@amaclean2/sundaypeak-treewells';
import {generalStyles} from '../GeneralStyles';
import {Meatball} from '../../Assets/UIGlyphs/Meatball';
import {styles} from './styles';
import ViewField from '../Reusable/Field';
import {Pin} from '../../Assets/UIGlyphs/Pin';
import ImageGallery from '../Reusable/ImageGallery';
import {useBuildButtons} from './MenuButtons';

const OtherUser = ({navigation, route}: any): JSX.Element => {
  const {workingUser, loggedInUser} = useUserStateContext();
  const {buildMenuButtons} = useBuildButtons();

  const onMenuPress = () => {
    const buttons = buildMenuButtons();
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: buttons.map(({title}) => title),
        cancelButtonIndex: 0,
      },
      buttonIndex => buttons[buttonIndex].action(),
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

  useEffect(() => {
    const match = route.params.userId === loggedInUser?.id;
    if (match) {
      navigation.navigate('UserStack', {screen: 'Profile'});
    }
  }, [route.params]);

  if (workingUser?.id === loggedInUser?.id) {
    return <></>;
  }

  return (
    <SafeAreaView
      style={[generalStyles.container, generalStyles.noSpaceContainer]}>
      <ScrollView>
        <View style={styles.topView}>
          {![null, undefined, ''].includes(workingUser?.profile_picture_url) ? (
            <Image
              source={{uri: workingUser?.profile_picture_url}}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImage} />
          )}
          <View style={localStyles.viewContainerVertical}>
            {workingUser?.city && (
              <View
                style={[
                  localStyles.viewContainerHorizontal,
                  localStyles.locationStyle,
                ]}>
                <Pin size={15} />
                <Text>{workingUser?.city}</Text>
              </View>
            )}
            <View style={localStyles.viewContainerHorizontal}>
              <Pressable
                onPress={() =>
                  navigation.navigate('FriendsList', {
                    friends: workingUser?.friends,
                    backName: workingUser?.first_name,
                  })
                }>
                <ViewField
                  title={'Friends'}
                  content={workingUser?.friends.length}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate('AdventuresList', {
                    todoAdventures: workingUser?.todo_adventures,
                    completedAdventures: workingUser?.completed_adventures,
                    backName: workingUser?.first_name,
                  })
                }>
                <ViewField
                  title={'Adventures'}
                  content={
                    (workingUser?.completed_adventures.length ?? 0) +
                    (workingUser?.todo_adventures.length ?? 0)
                  }
                />
              </Pressable>
            </View>
          </View>
        </View>
        <Text style={styles.bio}>{workingUser?.bio}</Text>
        <ImageGallery
          navigation={navigation}
          source="User"
          backName={`${workingUser?.first_name} ${workingUser?.last_name}`}
          images={workingUser?.images as string[]}
          onAddPicture={undefined}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  viewContainerVertical: {
    flexDirection: 'column',
    gap: 10,
  },
  viewContainerHorizontal: {
    flexDirection: 'row',
    gap: 20,
  },
  locationStyle: {
    gap: 5,
  },
});

export default OtherUser;
