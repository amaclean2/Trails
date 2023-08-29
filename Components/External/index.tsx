import React, {useState} from 'react';
import Signup from './Signup';
import Login from './Login';

const ExternalViews = (): JSX.Element => {
  const [userAuthFlow, setUserAuthFlow] = useState('login');
  return userAuthFlow === 'signup' ? (
    <Signup toggleAuthFlow={() => setUserAuthFlow('login')} />
  ) : (
    <Login toggleAuthFlow={() => setUserAuthFlow('signup')} />
  );
};

export default ExternalViews;
