import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
  },
  name: {
    fontSize: 23,
    color: '#222831',
  },
  separator: {
    borderLeftWidth: 3,
    borderLeftColor: '#222831',
    marginLeft: 10,
    marginRight: 10,
    margin: 5,
    borderRadius: 100,
  },
  photo: {
    color: '#222831',
  },
  body: {
    height: '84%',
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    borderColor: '#222831',
    borderWidth: 4,
  },
  page: {
    height: '93%',
    backgroundColor: '#dbdbdb',
  },
});
