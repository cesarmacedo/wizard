import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'a',
      token: 'aa',
    };
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    const user = await AsyncStorage.getItem('@user');
    const token = await AsyncStorage.getItem('@token');
    this.setState({user, token});
  }

  render() {
    return (
      <View>
        <Text>{this.state.user}</Text>
        <Text>{this.state.token}</Text>
      </View>
    );
  }
}
