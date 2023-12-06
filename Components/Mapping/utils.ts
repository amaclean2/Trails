import {
  useMessages,
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {Notifications} from 'react-native-notifications';

export const useSetupConversations = (navigation: any) => {
  const {newMessages, messages, conversations} = useMessagingStateContext();
  const {loggedInUser} = useUserStateContext();

  const {initiateConnection} = useMessages();

  const setupConversations = () => {
    initiateConnection();

    Notifications.registerRemoteNotifications();
    Notifications.events().registerRemoteNotificationsRegistered(
      (event: {deviceToken: string}) => {
        AsyncStorage.setItem('notification_device_token', event.deviceToken);
      },
    );
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event: any) => {
        console.error(event);
      },
    );

    // Notifications.ios.checkPermissions().then(currentPermissions => {
    //   console.log('Badges enabled: ' + !!currentPermissions.badge);
    //   console.log('Sounds enabled: ' + !!currentPermissions.sound);
    //   console.log('Alerts enabled: ' + !!currentPermissions.alert);
    //   console.log('Car Play enabled: ' + !!currentPermissions.carPlay);
    //   console.log(
    //     'Critical Alerts enabled: ' + !!currentPermissions.criticalAlert,
    //   );
    //   console.log('Provisional enabled: ' + !!currentPermissions.provisional);
    //   console.log(
    //     'Provides App Notification Settings enabled: ' +
    //       !!currentPermissions.providesAppNotificationSettings,
    //   );
    //   console.log('Announcement enabled: ' + !!currentPermissions.announcement);
    // });

    Notifications.events().registerNotificationReceivedForeground(
      (notification: any, completion: (response: any) => void) => {
        // console.log('Notification Received - Foreground', notification.payload);
        completion({alert: true, badge: true});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification: any, completion: () => void, action: any) => {
        navigation.navigate('ConversationSelector');
        completion();
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification: any, completion: (response: any) => void) => {
        // console.log('Notification Received - Background', notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, badge: true});
      },
    );
  };

  useEffect(() => {
    Notifications.removeAllDeliveredNotifications();
    Notifications.ios.cancelAllLocalNotifications();

    if (newMessages > 0 && messages?.[0].user_id !== loggedInUser?.id) {
      const message = messages?.[0];
      const conversationId = message?.conversation_id;
      const conversation = conversations?.[conversationId as number];
      const userName = conversation?.users.find(
        ({user_id}) => user_id !== loggedInUser?.id,
      )?.display_name;

      Notifications.postLocalNotification({
        body: message?.message_body as string,
        title: userName as string,
      });
    }
  }, [newMessages]);

  return {
    setupConversations,
  };
};
