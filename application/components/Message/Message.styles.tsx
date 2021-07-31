import { StyleSheet } from 'react-native';

import {
  MAIN_BLACK_COLOR,
  MAIN_WHITE_COLOR,
  MAIN_LIGHT_BLUE_COLOR,
  MAIN_DARK_GREY_COLOR,
} from '../../utils/consts';

export const styles = StyleSheet.create({
  message: {
    margin: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  messageInner: {},
  images: {
    // image case
  },
  image: {
    minWidth: 100,
    height: 300,
    marginBottom: 10,
  },
  content: {
    // content case
    minWidth: 200,
    padding: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: MAIN_LIGHT_BLUE_COLOR,
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 0.5,
  },
  contentOperator: {
    backgroundColor: MAIN_LIGHT_BLUE_COLOR,
    marginRight: 'auto',
  },
  contentClient: {
    backgroundColor: MAIN_WHITE_COLOR,
    marginLeft: 'auto',
  },
  text: {
    color: MAIN_WHITE_COLOR,
    fontSize: 16,
    fontWeight: '400',
  },
  textOperator: {
    color: MAIN_WHITE_COLOR,
  },
  textClient: {
    color: MAIN_BLACK_COLOR,
  },
  information: {
    marginTop: 5,
  },
  informationOperator: {
    flexDirection: 'row',
  },
  informationClient: {
    flexDirection: 'row-reverse',
  },
  writter: {
    color: MAIN_DARK_GREY_COLOR,
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  time: {
    color: MAIN_DARK_GREY_COLOR,
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  },
});
