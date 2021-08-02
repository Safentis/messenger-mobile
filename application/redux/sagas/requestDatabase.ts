import { put, StrictEffect } from 'redux-saga/effects';
import { Chatroom, Client } from '../../App.interface';

import { REQUEST_DATABASE_SET } from '../actions/application';

interface RequestClientPayload {
  payload: {
    database: {
      chatrooms: Chatroom;
      client: Client;
    };
  };
}

export default function* requestDatabase({
  payload: { database },
}: RequestClientPayload): Generator<StrictEffect, void, any> {
  try {
    yield put({
      type: REQUEST_DATABASE_SET,
      payload: {
        database,
      },
    });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}
