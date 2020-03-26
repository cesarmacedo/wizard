import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import Login from './pages/login';
import SignUp from './pages/signUp';

export default props => (
  <Router>
    <Stack key="Login">
      <Scene key="Login" component={Login} hideNavBar={true} initial />
      <Scene key="SignUp" component={SignUp} hideNavBar={true} />
    </Stack>
  </Router>
);
