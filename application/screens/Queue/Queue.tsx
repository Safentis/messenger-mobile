import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';

import { State } from '../../redux/reducers/application/application.interface';
import { requestQueue } from '../../redux/performers/application';

import { MAIN_BLUE_COLOR, MAIN_BROWN_COLOR } from '../../utils/consts';

const Queue: FC = () => {
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
  //* We make sort for the 'created' field
  const sortFunc = (b: any, a: any): number => {
    return +new Date(b[1].created) - +new Date(a[1].created);
  };

  const findFunc = ([key, value]: any, positionInQueue: number): void => {
    if (key === person.key) {
      dispatch(requestQueue({ positionInQueue }));
    }
  };

  useEffect(() => {
    if (chatrooms) {
      let entries: [string, any][] = Object.entries(chatrooms);
      let sortByCreated: [string, any][] = [];

      sortByCreated = entries.sort(sortFunc);
      sortByCreated.find(findFunc);
    }
  }, [chatrooms]);

  const handleReminde = (): void => {};

  return (
    <View style={styles.queue}>
      <View style={styles.queueText}>
        <Text style={styles.queueTextInfo}>
          You are in the queue on the{' '}
          <Text style={styles.queuePosition}>{positionInQueue}</Text> rd place.
          You will be answered soon
        </Text>
      </View>
      <View></View>
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

const styles = StyleSheet.create({
  queue: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 20,
    paddingTop: 0,
  },
  queueText: {
    flex: 10,
    marginTop: 10,
  },
  queueTextInfo: {
    color: MAIN_BLUE_COLOR,
    fontSize: 20,
  },
  queuePosition: {
    color: MAIN_BROWN_COLOR,
    fontWeight: 'bold',
    fontSize: 24,
  },
  queueButton: {
    flex: 3,
  },
});

export default Queue;
