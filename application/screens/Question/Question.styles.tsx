import { StyleSheet } from "react-native";

import { 
    MAIN_BLUE_COLOR, 
    MAIN_GREY_COLOR, 
    MAIN_LIGHT_GREY_COLOR,
    MAIN_WHITE_COLOR 
} from "../../utils/consts";

export const styles = StyleSheet.create({
    question: {
      padding: 20,
      paddingTop: 50,
    },
    questionTitle: {
      fontSize: 30,
      marginBottom: 30,
      textTransform: 'uppercase',
      fontWeight: '600'
    },
    questionBlock: {
      marginTop: 30,
    },
    questionLabel: {
  
    },
    questionInput: {
      marginTop: 5,
      paddingLeft: 18,
    },
    questionSelect: {
      marginTop: 5,
    },
    questionButton: {
      marginTop: 60,
    },
    input: {
      backgroundColor: MAIN_WHITE_COLOR,
      borderColor: MAIN_LIGHT_GREY_COLOR,
      borderBottomColor: MAIN_GREY_COLOR,
      borderRadius: 5,
      borderWidth: 1,
      paddingRight: 18,
      fontSize: 16,
      fontWeight: '500'
    },
    label: {
      color: MAIN_BLUE_COLOR,
      fontWeight: '600',
      fontSize: 18,
      textTransform: 'uppercase',
      textAlign: 'left',
    },
  });