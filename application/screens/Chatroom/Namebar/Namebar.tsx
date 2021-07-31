import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Props } from './Namebar.interface';
import { styles } from './Namebar.styles';
import { User } from '../../../App.interface';

const Namebar: FC<Props> = ({ messagesLength, operatorId }) => {
  const [operator, setOperator]: [User, Function] = useState({
    name: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const req = await fetch(
          `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/users/${operatorId}.json`,
        );
        const res = await req.json();
        setOperator(res);
      } catch (err) {
        console.error(err);
        console.error(err.message);
      }
    })();
  }, []);

  return (
    <View style={styles.namebar}>
      <View style={styles.namebarContent}>
        <Text style={styles.namebarText}>Dialog with:</Text>
        <Text style={[styles.namebarName]}>
          {operator.name}
        </Text>
      </View>
      {messagesLength > 0 ? (
        <View
          style={[styles.namebarButton, styles.button]}
          onTouchStart={() => Actions.complite()}
        >
          <Text style={styles.buttonText}>Complite</Text>
          <FontAwesomeIcon style={styles.buttonIcon} size={20} icon={faStar} />
        </View>
      ) : null}
    </View>
  );
};

export default Namebar;
