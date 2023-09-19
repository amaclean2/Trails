import {
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import React, {useEffect} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../Assets/Colors';
import TextBar from './TextBar';
import {Image} from 'react-native';

const ConversationView = ({navigation}) => {
  const {messages, conversations, currentConversationId} =
    useMessagingStateContext();
  const {loggedInUser} = useUserStateContext();

  const userImages = {};

  useEffect(() => {
    conversations?.[currentConversationId].users.forEach(user => {
      userImages[user.user_id] = user.profile_picture_url;
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={messages}
        style={localStyles.chatView}
        ItemSeparatorComponent={<View style={{height: 8}} />}
        renderItem={({item: message}) => (
          <Pressable
            onPress={() => console.log({message})}
            style={[
              localStyles.messageRow,
              message.user_id === loggedInUser?.id &&
                localStyles.messageRowSent,
            ]}>
            {message.user_id !== loggedInUser?.id && (
              <Image
                source={{uri: userImages[message.user_id]}}
                style={localStyles.userBubble}
              />
            )}
            <View
              style={[
                localStyles.messageBubble,
                message.user_id === loggedInUser?.id &&
                  localStyles.messageBubbleSent,
              ]}>
              <Text
                style={[
                  localStyles.messageText,
                  message.user_id === loggedInUser?.id &&
                    localStyles.messageTextSent,
                ]}>
                {message.message_body}
              </Text>
            </View>
          </Pressable>
        )}
      />
      <TextBar />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  messageRow: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  messageRowSent: {flexDirection: 'row-reverse'},
  messageText: {
    color: colors.mainDark,
  },
  messageBubble: {
    backgroundColor: colors.borderColor,
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    maxWidth: 300,
  },
  messageBubbleSent: {
    backgroundColor: colors.primaryAccentColor,
  },
  messageTextSent: {
    color: colors.mainLight,
  },
  chatView: {
    flexDirection: 'column',
    paddingVertical: 16,
  },
  userBubble: {
    width: 28,
    height: 28,
    backgroundColor: colors.borderColor,
    borderRadius: 50,
  },
});

export default ConversationView;
