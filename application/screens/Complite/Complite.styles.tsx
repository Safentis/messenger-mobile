import { StyleSheet } from 'react-native';

import { MAIN_GOLD_COLOR, MAIN_GREY_COLOR } from '../../utils/consts';

export const styles = StyleSheet.create({
    complite: {
        flex: 1,
    },
    compliteStars: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    compliteStarGrey: {
        color: MAIN_GREY_COLOR,
    },
    compliteStarGold: {
        color: MAIN_GOLD_COLOR,
    },
    compliteButton: {
        flex: 1,
    }
});
