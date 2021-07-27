import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import { PersistGate } from 'redux-persist/integration/react';

import Queue from './screens/Queue/Queue';
import Question from './screens/Question/Question';
import Chatroom from './screens/Chatroom/Chatroom';
import { persistor, store } from './redux/store/store';
import { requestChatrooms } from './redux/performers/application';
import { requestClient } from './redux/performers/application';
import useDatabase from './hooks/useDatabase';
import { State } from './redux/reducers/application/application.interface';

import { MAIN_BLUE_COLOR } from './utils/consts';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

const Routes = () => {
  //* ------------------------------------------------
  //* In this case we are getting an all data from database
  //* and set them to redux store
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(true);

  //* Getting person
  const person = useSelector(
    (state: { application: State }) => state.application.person,
  );

  //* useDatabase returns callback when all data coming from server
  useDatabase(undefined, (database: any) => {
    dispatch(requestChatrooms(database.chatrooms));
    dispatch(requestClient(database.client));
    setIsLoader(false);

    //* ---------------------------------------------------------------------
    //* In this case we are checking key and status, that to show a scene
    Object.entries(database.chatrooms).find(([key, value]: [string, any]) => {
      let isNoactive: boolean = value.status === 'noactive';
      let isActive: boolean = value.status === 'active';
      let isKey: boolean = person.key === key;

      if (isKey && isNoactive) {
        Actions.queue();
      } else if (isKey && isActive) {
        Actions.chatroom();
      }
    });
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
        style={styles.loader}
        size="large"
        color={MAIN_BLUE_COLOR}
      />
    </View>
  ) : (
    <Router sceneStyle={styles.container}>
      <Scene key="root">
        <Scene
          key="question"
          title="Question"
          component={Question}
          hideNavBar
          initial
        />
        <Scene
          key="queue"
          title="Queue"
          component={Queue}
          hideNavBar
        />
        <Scene
          key="chatroom"
          title="Chatroom"
          component={Chatroom}
          hideNavBar
        />
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {},
  container: {
    padding: 20,
  },
});

export default App;
