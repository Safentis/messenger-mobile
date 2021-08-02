import 'react-native-gesture-handler';
import React, { createContext, useContext } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PubNubProvider } from 'pubnub-react';
import PubNub from 'pubnub';

import { persistor, store } from './redux/store/store';
import Routes from './routes/Routes';
import Pubnub from 'pubnub';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-4e5c7380-df58-11eb-b709-22f598fbfd18',
  publishKey: 'pub-c-d4239ce3-2f26-42a7-9b3c-730ce6e7510f',
  ssl: true,
  presenceTimeout: 130,
});

interface GlobalContextInterface {
  pubnub: Pubnub;
}

export const GlobalContext = createContext<GlobalContextInterface>({
  pubnub: pubnub,
});

export const useGlobalContext = () => useContext(GlobalContext);

LogBox.ignoreLogs(['Setting a timer']);

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
