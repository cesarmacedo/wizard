import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
} from 'react-native';

import api from '../services/api';
import Styles from '../style/style';
import I18n from '../services/i18n';
const logoImage = require('../images/logo.png');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      offset: new Animated.ValueXY({x: 0, y: 95}),
      opacity: new Animated.Value(0),
      success: '',
      error: '',
      logo: new Animated.ValueXY({x: 300, y: 120}),
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
    Animated.parallel([
      Animated.spring(this.state.offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 30,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleEmailChange = email => {
    this.setState({error: '', email});
  };

  handlePasswordChange = password => {
    this.setState({error: '', password: password});
  };

  _keyboardDidShow = () => {
    Animated.parallel([
      Animated.timing(this.state.logo.x, {
        toValue: 150,
        duration: 200,
      }),
      Animated.timing(this.state.logo.y, {
        toValue: 65,
        duration: 200,
      }),
    ]).start();
  };

  _keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(this.state.logo.x, {
        toValue: 300,
        duration: 200,
      }),
      Animated.timing(this.state.logo.y, {
        toValue: 120,
        duration: 200,
      }),
    ]).start();
  };

  handleSignInPress = async () => {
    Keyboard.dismiss();
    if (this.state.sername === 0 || this.state.password.length === 0) {
      this.setState({error: I18n.t('mandatoryFields')}, () => false);
    } else {
      try {
        const response = await api.post('/v1/login', {
          email: this.state.email,
          password: this.state.password,
        });
        const {data} = response;
        const {token} = data;

        await AsyncStorage.setItem('@user', JSON.stringify(data));
        await AsyncStorage.setItem('@token', JSON.stringify(token));

        Actions.Home();
      } catch (error) {
        const {response} = error;
        const {status} = response ? response : {};
        if (status === 401) {
          this.setState({
            error: I18n.t('unauthorized'),
          });
        } else {
          this.setState({
            error: I18n.t('genericError'),
          });
        }
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={Styles.backGround}>
        <View style={[Styles.containerLogo]}>
          <Animated.Image
            style={[
              {
                width: this.state.logo.x,
                height: this.state.logo.y,
                opacity: this.state.opacity,
                transform: [{translateY: this.state.offset.y}],
              },
            ]}
            source={logoImage}
          />
        </View>
        <Animated.View style={[Styles.containerForm]}>
          <TextInput
            style={Styles.inputLogin}
            placeholder={I18n.t('email')}
            autoCorrect={false}
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            onFocus={() => this.setState({error: ''})}
          />
          <TextInput
            style={Styles.inputLogin}
            placeholder={I18n.t('password')}
            autoCorrect={false}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            secureTextEntry
            onFocus={() => this.setState({error: ''})}
          />
          <TouchableOpacity
            onPress={this.handleSignInPress}
            style={Styles.btnSubmitLogin}>
            <Text style={Styles.textSubmitLogin}>{I18n.t('SignIn')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Actions.SignUp();
            }}
            style={Styles.btnRegisterLogin}>
            <Text style={Styles.textRegisterLogin}>{I18n.t('SignUp')}</Text>
          </TouchableOpacity>
          {this.state.error.length !== 0 && (
            <Text style={Styles.ErrorMessageLogin}>{this.state.error}</Text>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
}
