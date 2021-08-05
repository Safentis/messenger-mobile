import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Props } from './Preview.interface';
import { styles } from './Preview.styles';
import { MAIN_BLUE_COLOR, MAIN_WHITE_COLOR } from '../../../utils/consts';

const Preview: FC<Props> = ({ image, handleDeleteImage }): React.ReactElement | null => {
  return image?.length > 0 ? (
    <View style={styles.preview}>
      <TouchableOpacity style={styles.previewIcon} onPress={handleDeleteImage}>
        <FontAwesomeIcon color={MAIN_WHITE_COLOR} size={20} icon={faTimes} />
      </TouchableOpacity>
      <Image
        style={styles.previewImage}
        source={{
          uri: image,
        }}
      />
    </View>
  ) : null;
};

export default Preview;
