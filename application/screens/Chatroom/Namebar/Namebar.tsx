import React, { FC } from 'react';
import { Button, Text, View } from 'react-native';

import { styles } from './Namebar.styles';
import { MAIN_BLUE_COLOR } from '../../../utils/consts';

const Namebar: FC = () => {
  return (
    <View style={styles.namebar}>
      <View style={styles.namebarContent}>
        <Text style={styles.namebarText}>Dialog with operator:</Text>
        <Text style={[styles.namebarText, styles.namebarName]}>Name</Text>
      </View>
      <View style={styles.namebarButton}>
        <Button
          title="Complite dialog"
          color={`${MAIN_BLUE_COLOR}`}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default Namebar;
