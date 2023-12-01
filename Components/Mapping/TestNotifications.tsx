import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  View,
  DeviceEventEmitter,
  SafeAreaView,
} from 'react-native';

type ButtonProps = {
  onPress: () => void | Promise<void>;
  label: string;
};

const Button = ({onPress, label}: ButtonProps) => {
  return (
    /** $FlowFixMe */
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
};

const TestNotifications = () => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    PushNotificationIOS.addEventListener('register', onRegistered);
    PushNotificationIOS.addEventListener(
      'registrationError',
      onRegistrationError,
    );
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
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

    return () => {
      PushNotificationIOS.removeEventListener('register');
      PushNotificationIOS.removeEventListener('registrationError');
      PushNotificationIOS.removeEventListener('notification');
      PushNotificationIOS.removeEventListener('localNotification');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendNotification = () => {
    DeviceEventEmitter.emit('remoteNotificationReceived', {
      remote: true,
      aps: {
        alert: {title: 'title', subtitle: 'subtitle', body: 'body'},
        badge: 1,
        sound: 'default',
        category: 'REACT_NATIVE',
        'content-available': 1,
        'mutable-content': 1,
      },
    });
  };

  const sendSilentNotification = () => {
    DeviceEventEmitter.emit('remoteNotificationReceived', {
      remote: true,
      aps: {
        category: 'REACT_NATIVE',
        'content-available': 1,
      },
    });
  };

  const sendLocalNotification = () => {
    PushNotificationIOS.presentLocalNotification({
      alertTitle: 'Sample Title',
      alertBody: 'Sample local notification',
      applicationIconBadgeNumber: 1,
    });
  };

  const sendLocalNotificationWithSound = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'notificationWithSound',
      title: 'Sample Title',
      subtitle: 'Sample Subtitle',
      body: 'Sample local notification with custom sound',
      sound: 'customSound.wav',
      badge: 1,
    });
  };

  const addNotificationRequest = () => {
    PushNotificationIOS.addNotificationRequest({
      id: 'ignore',
      title: 'title',
      subtitle: 'subtitle',
      body: 'body',
      category: 'test',
      threadId: 'thread-id',
      fireDate: new Date(new Date().valueOf() + 2000),
      repeats: true,
      userInfo: {
        image: 'https://www.github.com/Naturalclar.png',
      },
    });
  };

  const getPendingNotificationRequests = () => {
    PushNotificationIOS.getPendingNotificationRequests(requests => {
      Alert.alert('Push Notification Received', JSON.stringify(requests), [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ]);
    });
  };

  const setNotificationCategories = async () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'test',
        actions: [
          {id: 'open', title: 'Open', options: {foreground: true}},
          {
            id: 'ignore',
            title: 'Desruptive',
            options: {foreground: true, destructive: true},
          },
          {
            id: 'text',
            title: 'Text Input',
            options: {foreground: true},
            textInput: {buttonTitle: 'Send'},
          },
        ],
      },
    ]);
    Alert.alert(
      'setNotificationCategories',
      `Set notification category complete`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };

  const removeAllPendingNotificationRequests = () => {
    PushNotificationIOS.removeAllPendingNotificationRequests();
  };

  const removePendingNotificationRequests = () => {
    PushNotificationIOS.removePendingNotificationRequests(['test-1', 'test-2']);
  };

  const onRegistered = deviceToken => {
    Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
      {
        text: 'Dismiss',
        onPress: null,
      },
    ]);
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

  const onRemoteNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;

    const result = `
      Title:  ${notification.getTitle()};\n
      Subtitle:  ${notification.getSubtitle()};\n
      Message: ${notification.getMessage()};\n
      badge: ${notification.getBadgeCount()};\n
      sound: ${notification.getSound()};\n
      category: ${notification.getCategory()};\n
      content-available: ${notification.getContentAvailable()};\n
      Notification is clicked: ${String(isClicked)}.`;

    if (notification.getTitle() == undefined) {
      Alert.alert('Silent push notification Received', result, [
        {
          text: 'Send local push',
          onPress: sendLocalNotification,
        },
      ]);
    } else {
      Alert.alert('Push Notification Received', result, [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ]);
    }
    notification.finish('UIBackgroundFetchResultNoData');
  };

  const onLocalNotification = notification => {
    const isClicked = notification.getData().userInteraction === 1;

    Alert.alert(
      'Local Notification Received',
      `Alert title:  ${notification.getTitle()},
      Alert subtitle:  ${notification.getSubtitle()},
      Alert message:  ${notification.getMessage()},
      Badge: ${notification.getBadgeCount()},
      Sound: ${notification.getSound()},
      Thread Id:  ${notification.getThreadID()},
      Action Id:  ${notification.getActionIdentifier()},
      User Text:  ${notification.getUserText()},
      Notification is clicked: ${String(isClicked)}.`,
      [
        {
          text: 'Dismiss',
          onPress: null,
        },
      ],
    );
  };

  const showPermissions = () => {
    PushNotificationIOS.checkPermissions(permissions => {
      setPermissions({permissions});
    });
  };

  return (
    <View style={[styles.flex, styles.background]}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <Button onPress={sendNotification} label="Send fake notification" />
          <Button
            onPress={sendLocalNotification}
            label="Send fake local notification"
          />
          <Button
            onPress={sendLocalNotificationWithSound}
            label="Send fake local notification with custom sound"
          />
          <Button
            onPress={addNotificationRequest}
            label="Add Notification Request"
          />
          <Button
            onPress={setNotificationCategories}
            label="Set notification categories"
          />
          <Button
            onPress={removePendingNotificationRequests}
            label="Remove Partial Pending Notification Requests"
          />
          <Button
            onPress={removeAllPendingNotificationRequests}
            label="Remove All Pending Notification Requests"
          />
          <Button
            onPress={sendSilentNotification}
            label="Send fake silent notification"
          />

          <Button
            onPress={() =>
              PushNotificationIOS.setApplicationIconBadgeNumber(42)
            }
            label="Set app's icon badge to 42"
          />
          <Button
            onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)}
            label="Clear app's icon badge"
          />
          <Button
            onPress={getPendingNotificationRequests}
            label="Get Pending Notification Requests"
          />
          <View>
            <Button
              onPress={showPermissions}
              label="Show enabled permissions"
            />
            <Text>{JSON.stringify(permissions)}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TestNotifications;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F5FCFF',
  },
  flex: {flex: 1},
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
});
