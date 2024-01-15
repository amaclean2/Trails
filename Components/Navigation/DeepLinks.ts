import {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {navigateFromUrl} from './utils';

//navigation.navigate('AdventureStack', {
//  screen: 'OtherProfile',
//  params: {name: item.display_name, userId: item.user_id},
//});

export const useLinking = (navigation: any) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    getInitialLink();
    Linking.addEventListener('url', ({url: linkUrl}) => setUrl(linkUrl));
  }, []);

  useEffect(() => {
    if (url) {
      navigateFromUrl(navigation, url);
    }
  }, [url]);

  const getInitialLink = async () => {
    const initialUrl = await Linking.getInitialURL();

    if (!initialUrl) {
      return;
    } else {
      setUrl(initialUrl);
    }
  };
};
