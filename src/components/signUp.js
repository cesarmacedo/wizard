import React, {Component} from 'react';
import Styles from '../style/style';
import api from '../services/api';
import {Actions} from 'react-native-router-flux';
import I18n from '../services/i18n';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
} from 'react-native';

const logoImage = require('../images/logo.png');
const delay = 3000;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      password: '',
      email: '',
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
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleEmailChange = email => {
    email = email.replace(/\s/g, '');
    this.setState({error: ''});
    this.setState({email});
  };

  handleNicknameChange = nickname => {
    this.setState({error: ''});
    this.setState({nickname});
  };

  handlePasswordChange = password => {
    password = password.replace(/\s/g, '');
    this.setState({error: ''});
    this.setState({password});
  };

  _keyboardDidShow = () => {
    Animated.parallel([
      Animated.timing(this.state.logo.x, {
        toValue: 150,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.logo.y, {
        toValue: 65,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  _keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(this.state.logo.x, {
        toValue: 300,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.logo.y, {
        toValue: 120,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  handleSignUpPress = async () => {
    Keyboard.dismiss();
    if (
      this.state.nickname.trim().length === 0 ||
      this.state.password.trim().length === 0 ||
      this.state.email.trim().length === 0
    ) {
      this.setState({error: I18n.t('mandatoryFields')}, () => false);
    } else {
      try {
        await api.post('/v1/users', {
          email: this.state.email,
          nickname: this.state.nickname,
          password: this.state.password,
        });
        this.setState({success: I18n.t('SucessSignUp')});
        setTimeout(() => {
          Actions.Login();
        }, delay);
      } catch (error) {
        const {response} = error;
        const {status} = response ? response : {};
        if (status === 409) {
          this.setState({
            error: I18n.t('usedEmail'),
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
              },
            ]}
            source={logoImage}
          />
        </View>
        <Animated.View style={[Styles.containerForm]}>
          <TextInput
            style={Styles.inputSignUp}
            placeholder={I18n.t('nickname')}
            autoCorrect={false}
            value={this.state.nickname}
            onChangeText={this.handleNicknameChange}
            onFocus={() => this.setState({error: ''})}
          />
          <TextInput
            style={Styles.inputSignUp}
            placeholder="E-mail"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            onFocus={() => this.setState({error: ''})}
          />
          <TextInput
            style={Styles.inputSignUp}
            placeholder="Senha"
            autoCorrect={false}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            secureTextEntry
            onFocus={() => this.setState({error: ''})}
          />
          <TouchableOpacity
            onPress={this.handleSignUpPress}
            style={Styles.btnSubmitLogin}>
            <Text style={Styles.textSubmitLogin}>Cadastrar</Text>
          </TouchableOpacity>
          {this.state.error.length !== 0 && (
            <Text style={Styles.ErrorMessageLogin}>{this.state.error}</Text>
          )}
          {this.state.success.length !== 0 && (
            <Text style={Styles.SuccessMessageSignIn}>
              {this.state.success}
            </Text>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
}
