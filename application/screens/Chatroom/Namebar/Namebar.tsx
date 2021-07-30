import React, { FC } from 'react';
import { Button, Text, View } from 'react-native';

import { Props } from './Namebar.interface';

import { styles } from './Namebar.styles';
import { MAIN_BLUE_COLOR } from '../../../utils/consts';
import { Actions } from 'react-native-router-flux';

const Namebar: FC<Props> = ({ messagesLength }) => {
  return (
    <View style={styles.namebar}>
      <View style={styles.namebarContent}>
        <Text style={styles.namebarText}>Dialog with operator:</Text>
        <Text style={[styles.namebarText, styles.namebarName]}>Name</Text>
      </View>
      {messagesLength > 0 ? (
        <View style={styles.namebarButton}>
          <Button
            title="Complite dialog"
            color={`${MAIN_BLUE_COLOR}`}
            onPress={() => Actions.complite()}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Namebar;
