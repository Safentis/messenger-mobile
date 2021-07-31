import { StyleSheet } from 'react-native';

import {
  MAIN_BLUE_COLOR,
  MAIN_DARK_GREY_COLOR,
} from '../../../utils/consts';

export const styles = StyleSheet.create({
  namebar: {
    // Namebar
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    elevation: 2,
  },
  namebarContent: {
    flex: 1,
  },
  namebarText: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: MAIN_DARK_GREY_COLOR,
  },
  namebarName: {
    fontSize: 22,
    color: MAIN_BLUE_COLOR,
  },
  namebarButton: {
    shadowColor: MAIN_BLUE_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    marginLeft: 5,
    color: MAIN_BLUE_COLOR,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 16,
    color: MAIN_BLUE_COLOR,
  },
});
