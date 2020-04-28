import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Profile from '../components/profile';
import Header from '../components/header';
import Styles from '../style/page';
import I18n from '../services/i18n';

export default class Main extends Component {
  render() {
    return (
      <View style={Styles.page}>
        <Header name={I18n.t('profile')} isMenu={false} destiny={Actions.pop} />
        <Profile />
      </View>
    );
  }
}
