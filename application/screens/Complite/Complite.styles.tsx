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
        flex: 1
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },
    footer: {
        flex: 1,
    },
});
