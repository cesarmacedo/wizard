import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import Styles from '../style/profile';
import I18n from '../services/i18n';
import api from '../services/api';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      modalVisible: false,
      errorMessage: '',
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

  removeAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      await api.delete('/v1/user', {
        headers: `Bearer ${token}`,
      });
      Actions.Login();
    } catch (error) {
      const {response} = error;
      const {status} = response ? response : {};
      if (status === 401) {
        this.setState({
          errorMessage: I18n.t('unauthorized'),
          modalVisible: true,
        });
      } else {
        this.setState({
          errorMessage: I18n.t('genericError'),
          modalVisible: true,
        });
      }
    }
  };

  setModalVisible = modalVisible => {
    this.setState({modalVisible});
  };

  changeAvatar = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel) {
        const {uri} = response;
        const source = {uri};

        this.setState({
          avatar: source,
        });
      }
    });
  };

  render() {
    const {nickname, email, avatar, modalVisible, errorMessage} = this.state;
    const {setModalVisible} = this;

    return (
      <View style={Styles.userDetails}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text style={Styles.modalText}>{errorMessage}</Text>
              <TouchableHighlight
                style={{...Styles.openButton}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={Styles.textStyle}>{I18n.t('close')}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        {avatar ? (
          <TouchableOpacity
            onPress={this.changeAvatar}
            style={Styles.containerPhoto}>
            <Image source={avatar} style={Styles.photo} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={this.changeAvatar}
            style={Styles.containerAvatar}>
            <Icon name="user-follow" size={130} style={Styles.avatar} />
          </TouchableOpacity>
        )}
        <Text style={Styles.name}>{nickname}</Text>
        <Text style={Styles.email}>{email}</Text>
        <TouchableOpacity
          onPress={this.removeAccount}
          style={Styles.removeAccount}>
          <Icon name="trash" size={20} style={Styles.textRemoveAccount} />
          <Text style={Styles.textRemoveAccount}>
            {I18n.t('deleteAccount')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
