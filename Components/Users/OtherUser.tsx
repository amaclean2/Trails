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
import {
  useFollowUser,
  useGetUser,
  useMessages,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {generalStyles} from '../GeneralStyles';
import {Meatball} from '../../Assets/UIGlyphs/Meatball';
import {styles} from './styles';
import ViewField from '../Reusable/Field';
import {Pin} from '../../Assets/UIGlyphs/Pin';
import ImageGallery from '../Reusable/ImageGallery';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Navigation/AppContent';

const OtherUser = ({
  navigation,
  route,
}: NativeStackScreenProps<
  RootStackParamsList,
  'OtherProfile'
>): JSX.Element => {
  const {workingUser, loggedInUser} = useUserStateContext();
  const {friendUser} = useFollowUser();
  const {addConversation} = useMessages();
  const {getNonLoggedInUser} = useGetUser();

  useEffect(() => {
    const onMenuPress = () => {
      const isFriend = loggedInUser?.friends.some(
        ({user_id}: {user_id: number}) => user_id === workingUser.id,
      );

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            'Cancel',
            isFriend
              ? `Message ${workingUser?.first_name}`
              : `Friend ${workingUser?.first_name}`,
          ],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1 && isFriend) {
            addConversation({
              userId: workingUser?.id ?? 0,
            });
            navigation.navigate('ConversationView', {
              conversationName: `${workingUser?.first_name} ${workingUser?.last_name}`,
            });
          } else if (buttonIndex === 1 && !isFriend) {
            friendUser({leaderId: workingUser?.id ?? 0});
          } else {
            console.log(`Canceled ${buttonIndex}`);
          }
        },
      );
    };

    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={onMenuPress}>
          <Meatball />
        </Pressable>
      ),
      headerTitle: `${workingUser?.first_name} ${workingUser?.last_name}`,
    });
  }, [workingUser?.id]);

  useEffect(() => {
    const match = route.params?.userId === loggedInUser?.id;
    if (match) {
      navigation.navigate('UserStack', {screen: 'Profile'});
    }
    if (workingUser?.id !== route.params?.userId) {
      getNonLoggedInUser({userId: route.params?.userId});
    }
  }, [route.params]);

  if (route.params?.userId !== workingUser?.id) {
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
                style={styles.attributeButton}
                onPress={() =>
                  navigation.navigate('FriendsList', {
                    friends: workingUser?.friends,
                    backName: workingUser?.first_name,
                  })
                }>
                <ViewField
                  title={'Friends'}
                  content={workingUser?.friends.length}
                  contentStyles={styles.contentStyles}
                />
              </Pressable>
              <Pressable
                style={styles.attributeButton}
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
                  contentStyles={styles.contentStyles}
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
