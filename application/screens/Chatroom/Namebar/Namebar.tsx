import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Props } from './Namebar.interface';
import { styles } from './Namebar.styles';

const Namebar: FC<Props> = ({ messagesLength }) => {
  return (
    <View style={styles.namebar}>
      <View style={styles.namebarContent}>
        <Text style={styles.namebarText}>Dialog with:</Text>
        <Text style={[styles.namebarText, styles.namebarName]}>Name</Text>
      </View>
      {messagesLength > 0 ? (
        <View
          style={[styles.namebarButton, styles.button]}
          onTouchStart={() => Actions.complite()}
        >
          <Text style={styles.buttonText}>
            Complite
          </Text>
          <FontAwesomeIcon 
            style={styles.buttonIcon} 
            size={20}
            icon={faStar} 
          />
        </View>
      ) : null}
    </View>
  );
};

export default Namebar;
