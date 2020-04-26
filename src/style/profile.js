import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    marginTop: 30,
  },
  userDetails: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dbdbdb',
  },
  containerAvatar: {
    borderColor: '#020122',
    borderWidth: 2,
    width: '55%',
    height: '35%',
    borderRadius: 23,
    alignSelf: 'center',
    marginTop: '13%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  containerPhoto: {
    borderColor: '#020122',
    borderWidth: 2,
    width: '55%',
    height: '35%',
    borderRadius: 23,
    alignSelf: 'center',
    marginTop: '13%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'black',
  },
  photo: {
    borderRadius: 23,
    width: '100%',
    height: '114%',
    marginTop: 26,
  },
  name: {
    marginTop: 10,
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#191919',
  },
  email: {
    alignSelf: 'center',
    marginBottom: '45%',
    fontSize: 20,
  },
  removeAccount: {
    flexDirection: 'row',
    backgroundColor: '#c70039',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    alignSelf: 'center',
    borderColor: '#020122',
    borderWidth: 1,
  },
  textRemoveAccount: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
