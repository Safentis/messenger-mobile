import { StyleSheet } from "react-native";
import { 
    MAIN_DARK_GREY_COLOR,
    MAIN_WHITE_COLOR 
} from "../../../utils/consts";

export const styles = StyleSheet.create({
    inputbar: { // inputbar
        backgroundColor: MAIN_DARK_GREY_COLOR,
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
        color: MAIN_WHITE_COLOR
    },
    inputbarButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    inputbarButton: {
        margin: 5
    }
});