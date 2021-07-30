import React, { FC, useState } from 'react';
import { Button, View } from 'react-native';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { State } from '../../redux/reducers/application/application.interface';

import { styles } from './Complite.styles';
import { MAIN_GOLD_COLOR, MAIN_GREY_COLOR } from '../../utils/consts';

const Complite: FC = () => {
  const person = useSelector((state: { application: State }) => {
    return state.application.person;
  });
  const stars: number[] = [...Array(5).keys()];
  const [score, setScore] = useState(0);

  const handleScore = async () => {
    try {
      await fetch(
        `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${person.key}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'complited',
            score,
          }),
        },
      );
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };

  return (
    <View style={styles.complite}>
      <View style={styles.compliteStars}>
        {stars.map((star: number, index: number) => (
          <View key={index} onTouchStart={() => setScore(star + 1)}>
            <FontAwesomeIcon
              style={{
                color: score <= star ? MAIN_GREY_COLOR : MAIN_GOLD_COLOR,
              }}
              icon={faStar}
              size={40}
            />
          </View>
        ))}
      </View>
      <View style={styles.compliteButton}>
        <Button title="score" onPress={handleScore} />
      </View>
    </View>
  );
};

export default Complite;
