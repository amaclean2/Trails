export const navigateFromUrl = (navigation: any, url: string) => {
  const urlPath = url.split('//')[1];
  const urlPathArr = urlPath.split('/');
  const mainPathKey = urlPathArr.shift();
  const options = urlPathArr;

  switch (mainPathKey) {
    case 'user':
      return navigation.navigate('UserStack', {
        screen: 'OtherProfile',
        params: {name: '', backName: '', userId: Number(options[0])},
      });
    case 'adventure':
      return navigation.navigate('AdventureStack', {
        screen: 'Adventures',
        params: {adventureId: options[1], adventureType: options[0]},
      });
    case 'conversationSelector':
      return navigation.navigate('ConversationSelector');
    case 'login':
      return navigation.navigate('Login');
    case 'signup':
      return navigation.navigate('SignUp');
    case 'forgotPassword':
      return navigation.navigate('ForgotPassword');
    case 'home':
    default:
      return navigation.navigate('ExploreStack', {screen: 'Explore'});
  }
};
