import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import OneSignal from 'react-native-onesignal';

import { State } from '../../redux/reducers/application/application.interface';
import { requestQueue } from '../../redux/performers/application';
import { Chatroom } from '../../App.interface';

import { MAIN_BLUE_COLOR, MAIN_BROWN_COLOR } from '../../utils/consts';

type typesort = [string, Chatroom];
type typefilter = [string, Chatroom];
type typefind = [string, Chatroom];

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
  const filterFunc = ([key, value]: typefilter): boolean => {
    return value.status === 'noactive';
  };

  //* We make sort for the 'created' field 
  const sortFunc = (b: typesort, a: typesort): number => {
    let [keyB, valueB] = b;
    let [keyA, valueA] = a;

    let numA: number = +new Date(valueA.created);
    let numB: number = +new Date(valueB.created);

    return numB - numA;
  };

  const findFunc = ([key, value]: typefind, positionInQueue: number): void => {
    if (key === person.key) {
      dispatch(requestQueue({ positionInQueue }));
    }
  };

  useEffect(() => {
    if (chatrooms) {
      let entries: [string, Chatroom][];
      let isFiltered;
      let isSorted;

      entries = Object.entries(chatrooms);
      isFiltered = entries.filter(filterFunc);
      isSorted = isFiltered.sort(sortFunc);
      isSorted.find(findFunc);
    }
  }, [chatrooms]);

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

const styles = StyleSheet.create({
  queue: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    // margin: 5,
    // padding: 20,
    // paddingTop: 0,
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
