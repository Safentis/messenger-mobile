import { StyleSheet } from "react-native";

import { 
    MAIN_BLUE_COLOR, 
    MAIN_BROWN_COLOR 
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
      flex: 3,
    },
  });