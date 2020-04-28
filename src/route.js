import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import Login from './pages/login';
import SignUp from './pages/signUp';
import Home from './pages/home';
import Profile from './pages/profile';

export default props => (
  <Router>
    <Stack key="Login">
      <Scene key="Login" component={Login} hideNavBar={true} initial />
      <Scene key="SignUp" component={SignUp} hideNavBar={true} />
      <Scene key="Home" component={Home} hideNavBar={true} />
      <Scene key="Profile" component={Profile} hideNavBar={true} />
    </Stack>
  </Router>
);
