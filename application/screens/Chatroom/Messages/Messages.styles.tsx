import { StyleSheet } from 'react-native';

import { MAIN_BLUE_COLOR, MAIN_WHITE_COLOR } from '../../../utils/consts';

export const styles = StyleSheet.create({
  messages: {
    flex: 5,
    backgroundColor: MAIN_WHITE_COLOR,
  },
  sign: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 25,
  },
  signText: {
    fontSize: 25,
    fontWeight: '400',
    color: MAIN_BLUE_COLOR,
    textTransform: 'capitalize',
  },
  signIcon: {
    marginLeft: 10,
    color: MAIN_BLUE_COLOR,
  },
});
