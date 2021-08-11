import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import { useSelector } from 'react-redux';

import useQueue from '../../hooks/useQueue';

import { State } from '../../redux/reducers/application/application.interface';
import { styles } from './Queue.styles';
import { Chatroom } from '../../App.interface';

const Queue: FC = (): React.ReactElement => {
  //* ----------------------------------------------
  //* Redux
  const [positionInQueue, setPositionInQueue] = useState<number>(1); 
  const { person, chatrooms } = useSelector(
    (state: { application: State }) => {
      return {
        chatrooms: state.application.database.chatrooms,
        person: state.application.person,
      };
    },
  );

  //* ----------------------------------------------
  //* Function for handling
  useQueue({ chatrooms, person }, (positionInQueue: number) => {
    setPositionInQueue(positionInQueue);
  });

  useEffect(() => {
    let chatroom: Chatroom | undefined | null = chatrooms[person.key];
    if (chatroom && chatroom.status === 'active') {
      Actions.chatroom();
    }
  }, [chatrooms]);

  //* ----------------------------------------------
  // With this function, we expose tags for onsignals,
  // when operator enters in chatroom we are getting push-info
  const NOTIFICATION_TITLE = 'Notification';
  const NOTIFICATION_MESSAGE = 'You will receive a notification when the dialogue starts';
  const handleReminde = async () => {
    await OneSignal.sendTag('dialog', person.key);
    await OneSignal.getTags((tags) => {
      if ('dialog' in tags) {
        Alert.alert(
          NOTIFICATION_TITLE, 
          NOTIFICATION_MESSAGE
        );
      }
    });
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
      <TouchableOpacity style={styles.queueButton} onPress={handleReminde}>
        <Text style={styles.queueButtonText}>
          Remind when it's turn
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Queue;
