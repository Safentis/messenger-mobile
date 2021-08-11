import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';

import { Props } from './Preview.interface';
import { styles } from './Preview.styles';
import { MAIN_WHITE_COLOR } from '../../../utils/consts';

// prettier-ignore
const Preview: FC<Props> = ({ image, isLoading, handleDeleteImage }): React.ReactElement | null => {
  return image ? (
    <View style={styles.preview}>
      <TouchableOpacity style={styles.previewIcon} onPress={handleDeleteImage}>
        <FontAwesomeIcon color={MAIN_WHITE_COLOR} size={20} icon={faTimes} />
      </TouchableOpacity>
      {isLoading ? (
        <View style={styles.previewLoader}>
          <ActivityIndicator size="large" color={MAIN_WHITE_COLOR}/>
        </View>
      ) : (
        <Image
          style={styles.previewImage}
          source={{
            uri: image,
          }}
        />
      )}
    </View>
  ) : null;
};

export default Preview;
