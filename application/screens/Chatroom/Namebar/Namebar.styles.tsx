import { StyleSheet } from "react-native";

import { 
    MAIN_BLUE_COLOR,
    MAIN_GREY_COLOR 
} from "../../../utils/consts";

export const styles = StyleSheet.create({
    namebar: { // Namebar
        alignItems: 'center',
        backgroundColor: MAIN_GREY_COLOR,
        flexDirection: 'row',
        padding: 15,
    },
    namebarContent: {
        flex: 1,
    },
    namebarText: {
        fontSize: 20,
        color: MAIN_BLUE_COLOR        
    },
    namebarName: {
        fontSize: 22,
    },
    namebarButton: {

    },
}); 