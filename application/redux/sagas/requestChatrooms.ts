import { put, StrictEffect } from 'redux-saga/effects';

import { REQUEST_CHATROOMS_SET } from '../actions/application';
import { RequestChatrooms } from '../performers/application';

interface RequestChatroomsPayload {
    payload: RequestChatrooms,
};


export default function* requestChatrooms({ payload: { chatrooms } }: RequestChatroomsPayload): Generator<
    StrictEffect, 
    any, 
    any
> {
  try {
    yield put({
      type: REQUEST_CHATROOMS_SET,
      payload: {
        chatrooms,
      },
    });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}
