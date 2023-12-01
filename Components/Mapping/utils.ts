import {
  useMessages,
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useEffect} from 'react';
import {Alert} from 'react-native';

export const useSetupConversations = navigation => {
  const {initiateConnection} = useMessages();
  const {messages, conversations, currentConversationId} =
    useMessagingStateContext();
  const {loggedInUser} = useUserStateContext();

  const onRegistered = deviceToken => {
    console.log(`Registered to notifications: ${deviceToken}`);
  };

  const onRegistrationError = error => {
    Alert.alert(
      'Failed To Register For Remote Push',
      `Error (${error.code}): ${error.message}`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };

  const onLocalNotification = () => {
    const conversationName = conversations?.[
      currentConversationId as number
    ].users.find(({user_id}) => user_id !== loggedInUser?.id)?.display_name;
    navigation.navigate('ConversationView', {conversationName});
  };

  useEffect(() => {
    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener('notification');
      PushNotificationIOS.removeEventListener('localNotification');
    };
  }, []);

  useEffect(() => {
    messages && conversations && sendNotification();
  }, [messages, conversations]);

  const setupConversations = () => {
    initiateConnection();

    PushNotificationIOS.addEventListener('register', onRegistered);
    PushNotificationIOS.addEventListener(
      'registrationError',
      onRegistrationError,
    );
    PushNotificationIOS.addEventListener(
      'localNotification',
      onLocalNotification,
    );

    PushNotificationIOS.requestPermissions({
      alert: true,
      badge: true,
    })
      .then(data => {
        console.log('PushNotificationIOS.requestPermissions', data);
      })
      .catch(data => {
        console.log('PushNotificationIOS.requestPermissions failed', data);
      });
  };

  const sendNotification = () => {
    if (!messages?.[0]) {
      return;
    }

    const messageUsers =
      conversations?.[currentConversationId as number]?.users;
    const displayName = messageUsers?.find(
      ({user_id}) => user_id !== loggedInUser?.id,
    )?.display_name;

    const messageText = messages?.[0].message_body;

    console.log(messages?.[0]);

    if (!displayName || messages?.[0].user_id === loggedInUser?.id) {
      return;
    }

    PushNotificationIOS.addNotificationRequest({
      id: 'messageNotification',
      title: displayName,
      body: messageText,
      sound: 'customSound.wav',
      badge: 1,
    });
  };

  return {
    setupConversations,
  };
};
