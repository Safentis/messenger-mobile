import React, { useEffect, useState, FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';

import useDatabase from '../hooks/useDatabase';
import { requestChatrooms } from '../redux/performers/application';
import { requestClient } from '../redux/performers/application';
import { State } from '../redux/reducers/application/application.interface';
import { routes } from './Routes.template'; //* template of pathes
import { Route } from './Routes.template'; 

import { MAIN_BLUE_COLOR } from '../utils/consts';
import { styles } from './Routes.styles';

type isLoaderType = [boolean, Function];
type chatroomsType = [object, Function];

const Routes: FC = () => {
  //* ------------------------------------------------
  //* In this case we are getting an all data from database
  //* and set them to redux store
  const dispatch = useDispatch();
  const [isLoader, setIsLoader]: isLoaderType = useState<boolean>(true);

  //* Getting person
  const [chatrooms, setChatrooms]: chatroomsType = useState<object>({});
  const person = useSelector(
    (state: { application: State }) => state.application.person,
  );
  
  //* useDatabase returns callback when all data coming from server
  useDatabase(undefined, (database: any) => {
    dispatch(requestChatrooms(database.chatrooms));
    dispatch(requestClient(database.client));
    
    setIsLoader(false);
    setChatrooms(database.chatrooms);
  });

  //* ---------------------------------------------------------------------
  //* In this case we are checking key and status, that to show a scene
  useEffect(() => {
    Object.entries(chatrooms).find(([key, value]: [string, any]) => {
      let isNoactive: boolean = value.status === 'noactive';
      let isActive: boolean = value.status === 'active';
      let isKey: boolean = person.key === key;

      if (isKey && isNoactive) {
        Actions.queue();
      } else if (isKey && isActive) {
        Actions.chatroom();
      }
    });
  }, [chatrooms]);

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
        Actions.chatroom(); //* actions to chatroom
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);

        notificationReceivedEvent.complete(notification);
      },
    );

    OneSignal.setNotificationOpenedHandler(notification => {
      Actions.chatroom(); //* actions to chatroom
      console.log('OneSignal: notification opened:', notification);
    });

    return () => {
      OneSignal.unsubscribeWhenNotificationsAreDisabled(true);
    };
  }, []);

  return isLoader ? (
    <View style={styles.loaderWrapper}>
      <ActivityIndicator
        size="large"
        style={styles.loader}
        color={MAIN_BLUE_COLOR}
      />
    </View>
  ) : (
    <Router sceneStyle={styles.container}>
      <Scene key="root">
        {routes.map((route: Route) => (
          <Scene {...route} />
        ))}
      </Scene>
    </Router>
  );
};

export default Routes;
