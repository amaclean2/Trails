import React from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {generalStyles} from '../GeneralStyles';
import {
  useMessages,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {colors} from '../../Assets/Colors';
import Trash from '../../Assets/UIGlyphs/Trash';
import FlexSpacer from '../Reusable/FlexSpacer';
import {buildUserImageLocation} from './utils';

const SwipeableItem = ({navigation, item}: any) => {
  const {getConversation} = useMessages();
  const {loggedInUser} = useUserStateContext();

  const buildConversationName = (conversation: any) => {
    if (conversation.conversation_name) {
      return conversation.conversation_name;
    } else {
      if (conversation?.users.length > 2) {
        const displayNames = conversation.users
          .filter(
            ({user_id}: {user_id: number}) => user_id !== loggedInUser?.id,
          )
          .map(({display_name}: {display_name: string}) => display_name);
        return displayNames.join(', ');
      }
      return (
        conversation.users?.find(
          ({user_id}: {user_id: number}) => user_id !== loggedInUser?.id,
        )?.display_name || 'User'
      );
    }
  };

  const buildConversationIcon = (conversation: any) => {
    if (!loggedInUser?.id) {
      return null;
    }

    const locationArray = buildUserImageLocation(conversation.users.length - 1);
    if (conversation.conversation_icon) {
      return (
        <Image
          source={{uri: conversation.conversation_icon}}
          style={localStyles.conversationIcon}
        />
      );
    } else if (conversation.users.length < 3) {
      return (
        <Image
          source={{
            uri:
              conversation.users.find(
                (user: {user_id: number}) => user.user_id !== loggedInUser?.id,
              )?.profile_picture_url ?? '',
          }}
          style={localStyles.conversationIcon}
        />
      );
    } else if (conversation.users) {
      return (
        <View style={localStyles.conversationImageContainer}>
          {conversation.users
            .filter(
              (user: {user_id: number}) => user.user_id !== loggedInUser?.id,
            )
            .map(
              (
                {profile_picture_url}: {profile_picture_url: string},
                idx: number,
              ) => (
                <Image
                  source={{uri: profile_picture_url}}
                  style={[
                    localStyles.multipleUserIcon,
                    {top: locationArray[idx].y, left: locationArray[idx].x},
                  ]}
                />
              ),
            )}
        </View>
      );
    }
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [70, 0],
    });

    return (
      <View
        style={{
          width: 64,
        }}>
        <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
          <RectButton
            onPress={() => console.log('pressed')}
            style={{
              backgroundColor: colors.alertErrorColor,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              width: 64,
              flex: 1,
            }}>
            <Trash color={colors.mainLight} size={25} />
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  return (
    // <Swipeable renderRightActions={renderRightActions} rightThreshold={40}>
    <Pressable
      style={[generalStyles.listItem, localStyles.listItem]}
      onPress={() => {
        getConversation({conversationId: item.conversation_id});
        navigation.navigate('ConversationView', {
          conversationName: buildConversationName(item),
        });
      }}>
      {buildConversationIcon(item)}
      <View style={localStyles.listItemTextContent}>
        <Text
          style={[generalStyles.listText, localStyles.listText]}
          numberOfLines={1}>
          {buildConversationName(item)}
        </Text>
        <Text numberOfLines={1} style={{maxWidth: 240, fontSize: 16}}>
          {item.last_message}
        </Text>
      </View>
      <FlexSpacer />
      {item.unread && <View style={localStyles.unreadButton} />}
    </Pressable>
    // </Swipeable>
  );
};

const localStyles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  conversationIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  listItemTextContent: {
    flexDirection: 'column',
    gap: 5,
  },
  listText: {
    fontWeight: '600',
    fontSize: 18,
    maxWidth: 248,
  },
  unreadButton: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: colors.primaryAccentColor,
  },
  conversationImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.mainOffWhite,
  },
  multipleUserIcon: {
    width: 18,
    height: 18,
    borderRadius: 18,
    position: 'absolute',
  },
});

export default SwipeableItem;
