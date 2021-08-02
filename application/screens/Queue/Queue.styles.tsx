import { StyleSheet } from "react-native";

import { 
    MAIN_BLUE_COLOR, 
    MAIN_BROWN_COLOR, 
    MAIN_WHITE_COLOR
} from "../../utils/consts";

export const styles = StyleSheet.create({
    queue: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      padding: 20
    },
    queueText: {
      flex: 10,
      marginTop: 10,
    },
    queueTextInfo: {
      color: MAIN_BLUE_COLOR,
      fontSize: 20,
    },
    queuePosition: {
      color: MAIN_BROWN_COLOR,
      fontWeight: 'bold',
      fontSize: 24,
    },
    queueButton: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: MAIN_BLUE_COLOR,
      borderColor: MAIN_BLUE_COLOR,
      borderRadius: 5,
      elevation: .75,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 60,
      padding: 5.5,
      width: 300,
      shadowColor: MAIN_BLUE_COLOR,
      shadowOffset: { width: 0, height: .1 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
    },
    queueButtonText: {
      color: MAIN_WHITE_COLOR,
      fontSize: 16
    },
  });