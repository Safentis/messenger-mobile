import { takeEvery, all } from 'redux-saga/effects';

import requestPerson from './requestPerson';
import requestDatabase from './requestDatabase';
import requestMessage from './requestMessage';
import requestListener from './requestListener';

import {
  REQUEST_DATABASE,
  REQUEST_LISTENER,
  REQUEST_MESSAGE,
  REQUEST_PERSON,
} from '../actions/application';

export default function* rootSaga() {
  yield all([
    takeEvery(REQUEST_PERSON as any, requestPerson),
    takeEvery(REQUEST_DATABASE as any, requestDatabase),
    takeEvery(REQUEST_MESSAGE as any, requestMessage),
    takeEvery(REQUEST_LISTENER as any, requestListener),
  ]);
}
