import { StyleSheet } from 'react-native';

import {
  MAIN_BLUE_COLOR,
  MAIN_DARK_GREY_COLOR,
  MAIN_GREY_COLOR,
  MAIN_WHITE_COLOR,
} from '../../utils/consts';

export const styles = StyleSheet.create({
  message: {
    margin: 10,
  },
  messageInner: {},
  images: {
    // image case
  },
  image: {
    width: 100,
    height: 100,
  },
  information: {
    // information case
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  informationOperator: {
    alignSelf: 'flex-start',
  },
  informationClient: {
    alignSelf: 'flex-end',
  },
  writter: {},
  time: {},
  content: {
    // content case
    minWidth: 200,
    padding: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: MAIN_GREY_COLOR,
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 0.2,
    elevation: 0.5,
  },
  contentOperator: {
    backgroundColor: MAIN_BLUE_COLOR,
    marginRight: 'auto',
  },
  contentClient: {
    backgroundColor: MAIN_WHITE_COLOR,
    marginLeft: 'auto',
  },
  text: {
    color: MAIN_WHITE_COLOR,
    fontSize: 16,
  },
  textOperator: {
    color: MAIN_WHITE_COLOR,
  },
  textClient: {
    color: MAIN_BLUE_COLOR,
  },
});
