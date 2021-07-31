import { StyleSheet } from 'react-native';
import {
  MAIN_BLUE_COLOR,
  MAIN_DARK_GREY_COLOR,
  MAIN_LIGHT_GREY_COLOR,
} from '../../../utils/consts';

export const styles = StyleSheet.create({
  inputbar: {
    // inputbar
    backgroundColor: MAIN_LIGHT_GREY_COLOR,
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  textField: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  inputbarTextField: {
    color: MAIN_DARK_GREY_COLOR,
  },
  inputbarButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputbarButton: {
    // margin: 5,
  },
  inputbarIcon: {
    color: MAIN_BLUE_COLOR,
    marginLeft: 15,
    marginRight: 15,
  },
  iconSend: {

  },
  iconClip: {

  },
});
