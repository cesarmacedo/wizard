import React, {Component} from 'react';
import {View} from 'react-native';

import Home from '../components/home';
import Header from '../components/header';
import Styles from '../style/page';
import I18n from '../services/i18n';

export default class Main extends Component {
  render() {
    return (
      <View style={Styles.page}>
        <Header name={I18n.t('home')} isMenu={true} />
        <Home />
      </View>
    );
  }
}
