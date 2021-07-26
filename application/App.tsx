import 'react-native-gesture-handler';
import React from 'react';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { firebase } from '@react-native-firebase/database';
import {
  Router, 
  Scene, 
  Stack
} from 'react-native-router-flux';

import { store } from './redux/store/store';
import Queue from './screens/Queue/Queue';
import Question from './screens/Question/Question';
import { requestChatrooms } from './redux/performers/application';
import { requestClient } from './redux/performers/application';
import useDatabase from './hooks/useDatabase';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />      
    </Provider>
  );
};

const Routes = () => {

  //* ------------------------------------------------
  //* Redux
  const dispatch = useDispatch();
    
  useDatabase(undefined, (database: any) => {
    dispatch(requestChatrooms(database.chatrooms));
    dispatch(requestClient(database.client));
  });

  return (
    <Router>
      <Stack key="root">
        <Scene 
          key="question" 
          title="Question" 
          component={Question}
          hideNavBar
          tabs={true} 
          wrap={true}
          initial  
        />
        <Scene 
          key="queue" 
          title="Queue" 
          component={Queue}
          tabs={true} 
          wrap={true}
          hideNavBar
          // initial 
        />
      </Stack>
    </Router>
  )
}

export default App;