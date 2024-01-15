import {
  useMessages,
  useMessagingStateContext,
  useUserStateContext,
} from '@amaclean2/sundaypeak-treewells';
import {useEffect} from 'react';
import {Notifications} from 'react-native-notifications';

export const useSetupConversations = (navigation: any) => {
  const {newMessages, messages, conversations, apnsDeviceToken} =
    useMessagingStateContext();
  const {loggedInUser} = useUserStateContext();

  const {initiateConnection, setDeviceToken} = useMessages();

  useEffect(() => {
    if (apnsDeviceToken !== null) {
      initiateConnection();
    }
  }, [apnsDeviceToken]);

  const setupConversations = () => {
    Notifications.registerRemoteNotifications();
    Notifications.events().registerRemoteNotificationsRegistered(
      (event: {deviceToken: string}) => {
        console.log({deviceToken: event.deviceToken, userId: loggedInUser.id});
        setDeviceToken({deviceToken: event.deviceToken});
      },
    );
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event: any) => {
        console.error(event);
      },
    );

    Notifications.ios.checkPermissions().then(async currentPermissions => {
      console.log({currentPermissions});
      Notifications.ios.setBadgeCount(0);
    });

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

  return {
    setupConversations,
  };
};
