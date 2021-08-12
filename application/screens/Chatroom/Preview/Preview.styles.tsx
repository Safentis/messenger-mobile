import { StyleSheet } from 'react-native';
import { MAIN_GREY_COLOR } from '../../../utils/consts';

export const styles = StyleSheet.create({
  preview: {
    position: 'absolute',
    bottom: 120,
    left: 10,
    right: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  previewImage: {
    flex: 1,
    height: 200,
  },
  previewIcon: {
    top: 5,
    right: 5,
    zIndex: 10,
    position: 'absolute',
  },
  previewLoader: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 200,
    backgroundColor: MAIN_GREY_COLOR,
  },
});
