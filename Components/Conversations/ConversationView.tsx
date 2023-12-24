import React, {useEffect, useState} from 'react';
import {
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Linking,
  Alert,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {colors} from '../../Assets/Colors';
import TextBar from './TextBar';

import {generalStyles} from '../GeneralStyles';
import Hyperlink from 'react-native-hyperlink';

const ConversationView = () => {
  const {messages, conversations, currentConversationId} =
    useMessagingStateContext();
  let messageRef: any;
  const {loggedInUser} = useUserStateContext();
  const [userImages, setUserImages] = useState<any>({});

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (conversations?.[currentConversationId as number]) {
      conversations?.[currentConversationId as number].users.forEach(user => {
        setUserImages({
          ...userImages,
          [user.user_id]: user.profile_picture_url,
        });
      });
    }
  }, []);

  const handleLinking = async (url: string): Promise<void> => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Can't open url: ${url}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
      style={generalStyles.fullScreenView}>
      <SafeAreaView
        style={[generalStyles.fullScreenView, localStyles.container]}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={localStyles.container}>
            <FlatList
              data={messages}
              inverted
              initialNumToRender={15}
              ref={ref => (messageRef = ref)}
              contentContainerStyle={localStyles.chatView}
              ItemSeparatorComponent={() => <View style={{height: 8}} />}
              renderItem={({item: message}) => (
                <Pressable
                  key={message.date_created}
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
                    <Hyperlink onPress={handleLinking}>
                      <Text
                        style={[
                          localStyles.messageText,
                          message.user_id === loggedInUser?.id &&
                            localStyles.messageTextSent,
                        ]}>
                        {message.message_body}
                      </Text>
                    </Hyperlink>
                  </View>
                </Pressable>
              )}
            />
            <TextBar
              onClick={() => {
                messages?.length && messageRef.scrollToIndex({index: 0});
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainOffWhite,
    flex: 1,
  },
  messageRow: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  messageRowSent: {flexDirection: 'row-reverse'},
  messageText: {
    color: colors.mainDark,
    fontSize: 16,
  },
  messageBubble: {
    backgroundColor: colors.textAreaBackground,
    padding: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    maxWidth: 300,
    borderBottomLeftRadius: 0,
  },
  messageBubbleSent: {
    backgroundColor: colors.primaryAccentColor,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15,
  },
  messageTextSent: {
    color: colors.mainLight,
  },
  chatView: {
    paddingVertical: 10,
    backgroundColor: colors.mainLight,
    minHeight: '100%',
  },
  userBubble: {
    width: 28,
    height: 28,
    backgroundColor: colors.textAreaBackground,
    borderRadius: 50,
  },
});

export default ConversationView;
