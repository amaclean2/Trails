import React from 'react';
import {
  ActionSheetIOS,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {
  useGetUser,
  useMessages,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {generalStyles} from '../GeneralStyles';
import {Meatball} from '../../Assets/UIGlyphs/Meatball';
import {styles} from './styles';
import ViewField from '../Reusable/Field';
import {useImageUploads} from '../Helpers';
import ImageGallery from '../Reusable/ImageGallery';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../Navigation/AppContent';

const UserProfile = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList, 'Profile'>): JSX.Element => {
  const {logoutUser} = useGetUser();
  const {loggedInUser} = useUserStateContext();
  const {saveUserImage} = useImageUploads();
  const {closeConnection} = useMessages();

  const onMenuPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Share', 'Edit Profile', 'Logout'],
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            return Share.share({
              message: 'Check out this adventure!',
              url: `https://sundaypeak.com/user/${loggedInUser?.id}`,
            }).then(result => {
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  console.log('Shared successfully');
                } else {
                  console.log('No activity');
                }
              } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
              }
            });
          case 2:
            navigation.navigate('EditUser', {
              userName: `${loggedInUser?.first_name} ${loggedInUser?.last_name}`,
            });
            break;
          case 3:
            closeConnection('moving away from conversations');
            logoutUser();
            navigation.navigate('Login');
            break;
          default:
            console.log('canceled');
        }
      },
    );
  };

  return (
    <SafeAreaView style={generalStyles.container}>
      <StatusBar />
      <ScrollView>
        <View style={generalStyles.header}>
          <View style={generalStyles.headerTextLayout}>
            <Text style={generalStyles.headerText}>
              {`${loggedInUser?.first_name} ${loggedInUser?.last_name}`}
            </Text>
            {loggedInUser?.city && (
              <Text style={generalStyles.headerSubText}>
                {loggedInUser?.city}
              </Text>
            )}
          </View>
          <Pressable onPress={onMenuPress}>
            <Meatball />
          </Pressable>
        </View>
        <View style={styles.topView}>
          <Image
            source={{uri: loggedInUser?.profile_picture_url}}
            style={styles.profileImage}
          />
          <Pressable
            style={styles.attributeButton}
            onPress={() =>
              navigation.navigate('FriendsList', {
                friends: loggedInUser?.friends,
                backName: loggedInUser?.first_name,
              })
            }>
            <ViewField
              title={'Friends'}
              content={loggedInUser?.friends.length}
              contentStyles={styles.contentStyles}
            />
          </Pressable>
          <Pressable
            style={styles.attributeButton}
            onPress={() =>
              navigation.navigate('AdventuresList', {
                todoAdventures: loggedInUser?.todo_adventures,
                completedAdventures: loggedInUser?.completed_adventures,
                backName: loggedInUser?.first_name,
              })
            }>
            <ViewField
              title={'Adventures'}
              content={loggedInUser?.completed_adventures.length}
              contentStyles={styles.contentStyles}
            />
          </Pressable>
        </View>
        <Text style={styles.bio}>{loggedInUser?.bio}</Text>
        <ImageGallery
          navigation={navigation}
          source={'User'}
          backName={`${loggedInUser?.first_name} ${loggedInUser?.last_name}`}
          images={loggedInUser?.images ?? []}
          onAddPicture={saveUserImage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
