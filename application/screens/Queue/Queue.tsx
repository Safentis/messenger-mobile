import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  View, 
  Text,
  Button, 
} from 'react-native';
import OneSignal from 'react-native-onesignal';

import { State } from '../../redux/reducers/application/application.interface';
import { requestQueue } from '../../redux/performers/application';
import useQueue from '../../hooks/useQueue';

import { MAIN_BLUE_COLOR } from '../../utils/consts';
import { styles } from './Queue.styles';

const Queue: FC = (): React.ReactElement => {
  //* ----------------------------------------------
  //* Redux
  const dispatch = useDispatch();
  const { positionInQueue, person, chatrooms } = useSelector(
    (state: { application: State }) => {
      return {
        positionInQueue: state.application.positionInQueue,
        chatrooms: state.application.chatrooms,
        person: state.application.person,
      };
    },
  );

  //* ----------------------------------------------
  //* Function for handling
  useQueue({chatrooms, person}, (positionInQueue: number) => {
    dispatch(requestQueue({ positionInQueue }));
  });

  //* ----------------------------------------------
  // With this function, we expose tags for onsignals,
  // when operator enters in chatroom we are getting push-info
  const handleReminde = (): void => {
    OneSignal.sendTag('dialog', person.key);
  };

  return (
    <View style={styles.queue}>
      <View style={styles.queueText}>
        <Text style={styles.queueTextInfo}>
          You are in the queue on the{' '}
          <Text style={styles.queuePosition}>{positionInQueue}</Text> rd place.
          You will be answered soon
        </Text>
      </View>
      <View style={styles.queueButton}>
        <Button
          title="Remind when it's turn"
          color={`${MAIN_BLUE_COLOR}`}
          onPress={handleReminde}
        />
      </View>
    </View>
  );
};

export default Queue;