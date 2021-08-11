import { createStore, applyMiddleware, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga';
import FSStorage from 'redux-persist-fs-storage';

import { rootReducer } from '../reducers/rootReducer';
import rootSaga from '../sagas/sagas';

const persistConfig = {
    key: 'root',
    keyPrefix: '',
    storage: FSStorage(),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore(
    persistedReducer, 
    applyMiddleware(sagaMiddleware)
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
