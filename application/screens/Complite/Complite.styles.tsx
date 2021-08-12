import { StyleSheet } from 'react-native';

import { MAIN_BLUE_COLOR } from '../../utils/consts';

export const styles = StyleSheet.create({
  complite: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: MAIN_BLUE_COLOR,
  },
  header: {
    flex: 1,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: MAIN_BLUE_COLOR,
    borderRadius: 5,
    padding: 7.5,
  },
  buttonIcon: {
    marginLeft: 15,
    color: MAIN_BLUE_COLOR,
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 26,
    color: MAIN_BLUE_COLOR,
  },
});
