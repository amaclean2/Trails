import React, {useEffect, useRef} from 'react';
import {AppState} from 'react-native';

const TestNotifications = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground');
      } else if (nextAppState === 'background') {
        // Notifications.postLocalNotification({
        //   body: 'This is a remote notification',
        //   title: 'Remote Notification',
        // });
      }

      appState.current = nextAppState;
      console.log('App State', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <></>;
};

export default TestNotifications;
