import React, { FC, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';

import { requestPerson } from '../../redux/performers/application';
import { useGlobalContext } from '../../App'
import { complitedDialog } from '../../utils/functions';
import { State } from '../../redux/reducers/application/application.interface';
import { Person } from '../../App.interface';
import { styles } from './Complite.styles';
import { 
  MAIN_GOLD_COLOR, 
  MAIN_GREY_COLOR 
} from '../../utils/consts';


const Complite: FC = () => {
  const dispatch = useDispatch();
  const { pubnub } = useGlobalContext();
  const { person, listener } = useSelector((state: { application: State }) => {
    return {
      person: state.application.person as Person,
      listener: state.application.listener,
    }; 
  });

  const stars: number[] = [...Array(5).keys()];
  const [score, setScore] = useState<number>(0);

  const handleScore = async (): Promise<void> => {
    //* is score is equal of the zerro
    if (score === 0) return;

    try {
      await complitedDialog(person, score); //* from utils/functions
      await dispatch(requestPerson({
        name: '',
        key: '',
        theme: '',
        subtheme: '',
      }));

      //* in this case, we are deleling all subscribes
      //* and listeners
      pubnub.unsubscribeAll();
      pubnub.deleteUser('client');
      pubnub.removeListener(listener);

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
            <TouchableOpacity key={index} onPress={() => setScore(star + 1)}>
              <FontAwesomeIcon
                style={{
                  color: score <= star 
                    ? MAIN_GREY_COLOR 
                    : MAIN_GOLD_COLOR,
                }}
                icon={faStar}
                size={50}
              />
            </TouchableOpacity>
          ),
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleScore}>
          <Text style={styles.buttonText}>
            Appreciate
          </Text>
          <FontAwesomeIcon 
            style={styles.buttonIcon} 
            size={25}
            icon={faCheck} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Complite;
