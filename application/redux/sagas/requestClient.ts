import { put, StrictEffect } from 'redux-saga/effects';

import { REQUEST_CLIENT_SET } from '../actions/application';
import { RequestClient } from '../performers/application';

interface RequestClientPayload {
    payload: RequestClient,
};

export default function* requestClient({ payload: { client } }: RequestClientPayload): Generator<
    StrictEffect, 
    any, 
    any
> {
  try {
    yield put({
      type: REQUEST_CLIENT_SET,
      payload: {
        client,
      },
    });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}
