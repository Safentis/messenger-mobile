import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    preview: {
        position: 'absolute',
        bottom: 120,
        left: 10,
        right: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    previewImage: {
        flex: 1,
        height: 200,
    },
    previewIcon: {
        top: 5,
        right: 5,
        zIndex: 10,
        position: 'absolute'
    }
});