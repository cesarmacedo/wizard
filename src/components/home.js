import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import Styles from '../style/home';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
    };
  }

  componentDidMount() {
    this.getInfos();
  }

  async getInfos() {
    const user = await AsyncStorage.getItem('@user');
    const {avatar, email, nickname} = JSON.parse(user);
    this.setState({avatar, email, nickname});
  }

  render() {
    const {nickname} = this.state;
    return (
      <View style={[Styles.page]}>
        <View style={[Styles.header]}>
          <TouchableOpacity onPress={() => Actions.Profile()}>
            <Icon name="user" size={65} style={Styles.photo} />
          </TouchableOpacity>
          <View style={[Styles.separator]} />
          <Text style={[Styles.name]}>{nickname}</Text>
        </View>
        <View style={[Styles.body]} />
      </View>
    );
  }
}
