import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Styles from '../style/header';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  goBack = () => {
    const {destiny} = this.props;
    destiny();
  };

  render() {
    const {name, isMenu} = this.props;
    const {goBack} = this;

    return (
      <View style={Styles.header}>
        {isMenu === true ? (
          <Icon name="menu" style={Styles.icon} />
        ) : (
          <Icon
            name="arrow-left"
            style={Styles.icon}
            onPress={() => goBack()}
          />
        )}
        <Text style={Styles.name}>{name}</Text>
      </View>
    );
  }
}
