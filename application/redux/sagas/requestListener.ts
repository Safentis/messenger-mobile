import { put, StrictEffect } from 'redux-saga/effects';

import { REQUEST_LISTENER_SET } from '../actions/application';

interface RequestClientPayload {
  payload: {
    listener: object;
  };
}

export default function* requestListener({
  payload: { listener },
}: RequestClientPayload): Generator<StrictEffect, void, any> {
  try {
    yield put({
      type: REQUEST_LISTENER_SET,
      payload: {
        listener,
      },
    });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}
