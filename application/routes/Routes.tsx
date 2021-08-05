import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';

import Question from '../screens/Question/Question';
import Queue from '../screens/Queue/Queue';
import Chatroom from '../screens/Chatroom/Chatroom';
import Complite from '../screens/Complite/Complite';
import useDatabase from '../hooks/useDatabase';
import { requestDatabase } from '../redux/performers/application';

import { State } from '../redux/reducers/application/application.interface';
import { styles } from './Routes.styles';

const Routes: FC = (): React.ReactElement => {
  //* ------------------------------------------------
  //* In this case we are getting an all data from database
  //* and set them to redux store.
  const dispatch = useDispatch();

  useDatabase(undefined, database => {
    dispatch(requestDatabase(database));
  });

  //* Getting person
  // const [chatrooms, setChatrooms]: chatroomsType = useState<object>({});
  const { person, chatrooms } = useSelector((state: { application: State }) => {
    return {
      person: state.application.person,
      chatrooms: state.application.database?.chatrooms,
    };
  });

  //* ------------------------------------------------
  //* OneSignals - init
  useEffect(() => {
    //* Start init
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('a2911f18-bdfe-49d5-91c4-be043931de21');
    //* End init

    //* Handlers
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        const data = notification.additionalData;
        notificationReceivedEvent.complete(notification);
      },
    );
    return () => {
      OneSignal.unsubscribeWhenNotificationsAreDisabled(true);
    };
  }, []);

  //* ------------------------------------------------
  //* Initial state of scenes
  const chatroomHasProperty = (key: string, chatrooms: object): boolean => {
    return chatrooms ? chatrooms.hasOwnProperty(key) : false;
  };

  const chatroomHasStatus = (key: string, chatrooms: any, status: string): boolean => {
    switch (status) {
      case 'complited':
        return key.length === 0 || chatrooms[key].status === status;
      case 'noactive':
        return key.length > 0 && chatrooms[key].status === status;
      case 'active':
        return key.length > 0 && chatrooms[key].status === status;
      default:
        return false;
    }
  };

  return (
    <Router sceneStyle={styles.container}>
      <Scene key="root">
        <Scene
          key="question"
          component={Question}
          hideNavBar={true}
          initial={
            chatroomHasProperty(person.key, chatrooms) &&
            chatroomHasStatus(person.key, chatrooms, 'complited')
          }
        />
        <Scene
          key="queue"
          component={Queue}
          hideNavBar={true}
          initial={
            chatroomHasProperty(person.key, chatrooms) &&
            chatroomHasStatus(person.key, chatrooms, 'noactive')
          }
        />
        <Scene
          key="chatroom"
          component={Chatroom}
          hideNavBar={true}
          initial={
            chatroomHasProperty(person.key, chatrooms) &&
            chatroomHasStatus(person.key, chatrooms, 'active')
          }
        />
        <Scene key="complite" component={Complite} hideNavBar={true} />
      </Scene>
    </Router>
  );
};

export default Routes;
