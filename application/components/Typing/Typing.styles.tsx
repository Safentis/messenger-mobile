import { StyleSheet } from 'react-native';

import { MAIN_BLUE_COLOR } from '../../utils/consts';

export const styles = StyleSheet.create({
    typing: {
        alignItems: 'center'
    },
    typingMessage: {
        textTransform: 'uppercase',
        fontSize: 14,
        color: MAIN_BLUE_COLOR
    }
});