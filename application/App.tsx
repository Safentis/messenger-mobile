import 'react-native-gesture-handler';
import React, { createContext, useContext } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PubNubProvider } from 'pubnub-react';
import PubNub from 'pubnub';

import { REACT_APP_SUBSCRIBE_KEY, REACT_APP_PUBLISH_KEY } from '@env';
import { GlobalContextInterface } from './App.interface';
import { persistor, store } from './redux/store/store';
import Routes from './routes/Routes';

LogBox.ignoreLogs(['Setting a timer']);

const pubnub = new PubNub({
  subscribeKey: REACT_APP_SUBSCRIBE_KEY,
  publishKey: REACT_APP_PUBLISH_KEY,
  ssl: true,
  presenceTimeout: 130,
});

export const GlobalContext = createContext<GlobalContextInterface>({
  pubnub: pubnub,
});

export const useGlobalContext = () => useContext(GlobalContext);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PubNubProvider client={pubnub}>
          <GlobalContext.Provider value={{ pubnub }}>
            <Routes />
          </GlobalContext.Provider>
        </PubNubProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
