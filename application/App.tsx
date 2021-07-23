import 'react-native-gesture-handler';
import React from 'react';
import {
  Router, 
  Scene, 
  Stack
} from 'react-native-router-flux';

import Queue from './screens/Queue/Queue';
import Question from './screens/Question/Question';

const App = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene 
          key="question" 
          title="Question" 
          component={Question}
          initial  
        />
        <Scene 
          key="queue" 
          title="Queue" 
          component={Queue} 
        />
      </Stack>
    </Router>
  );
};

export default App;
