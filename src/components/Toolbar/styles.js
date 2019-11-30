import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    backgroundColor: Colors.colorPrimary,
    width: Dimensions.get('window').width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toolbar_title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  toolbar_back: {
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0
  },
  toolbar_left_arrow: {
    width: 25,
    height: 25
  },
  toolbar_right: {
    width: 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0
  },
  toolbar_right_button: {
    width: 25,
    height: 25
  }
});
