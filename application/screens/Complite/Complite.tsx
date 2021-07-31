import React, { FC, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';

import { requestPerson } from '../../redux/performers/application';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { State } from '../../redux/reducers/application/application.interface';

import { styles } from './Complite.styles';
import { 
  MAIN_GOLD_COLOR, 
  MAIN_GREY_COLOR 
} from '../../utils/consts';

const Complite: FC = () => {
  const dispatch = useDispatch();
  const person = useSelector((state: { application: State }) => {
    return state.application.person;
  });

  const stars: number[] = [...Array(5).keys()];
  const [score, setScore] = useState(0);

  const handleScore = async (): Promise<void> => {
    //* is score is equal of the zerro
    if (score === 0) return;

    try {
      await fetch(
        `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${person.key}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'complited',
            score,
          }),
        },
      );

      await dispatch(requestPerson({
        name: '',
        key: '',
        theme: '',
        subtheme: '',
      }));

      Actions.question();
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };

  return (
    <View style={styles.complite}>
      <View style={styles.header}>
        <Text style={styles.text}>
          Dialogue completed. {'\n'} 
          Rate communication with a specialist.
        </Text>
      </View>
      <View style={styles.body}>
        {stars.map(
          (star: number, index: number): React.ReactNode => (
            <View key={index} onTouchStart={() => setScore(star + 1)}>
              <FontAwesomeIcon
                style={{
                  color: score <= star 
                    ? MAIN_GREY_COLOR 
                    : MAIN_GOLD_COLOR,
                }}
                icon={faStar}
                size={50}
              />
            </View>
          ),
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.button} onTouchStart={handleScore}>
          <Text style={styles.buttonText}>
            Appreciate
          </Text>
          <FontAwesomeIcon 
            style={styles.buttonIcon} 
            size={25}
            icon={faCheck} 
          />
        </View>
      </View>
    </View>
  );
};

export default Complite;
