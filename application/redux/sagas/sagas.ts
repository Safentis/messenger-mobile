import { takeEvery, all } from 'redux-saga/effects';

import requestQueue from './requestQueue';
import requestPerson from './requestPerson';
import requestChatrooms from './requestChatrooms';
import requestClient from './requestClient';
import requestMessage from './requestMessage';

import { 
  REQUEST_CHATROOMS,
  REQUEST_CLIENT,
  REQUEST_MESSAGE,
  REQUEST_PERSON, 
  REQUEST_QUEUE
} from '../actions/application';

export default function* rootSaga() {
  yield all([
    takeEvery(REQUEST_QUEUE, requestQueue),
    takeEvery(REQUEST_PERSON, requestPerson),
    takeEvery(REQUEST_CHATROOMS, requestChatrooms),
    takeEvery(REQUEST_CLIENT, requestClient),
    takeEvery(REQUEST_MESSAGE, requestMessage),
  ]);
}
