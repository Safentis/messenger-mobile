import { put, StrictEffect } from 'redux-saga/effects';

import { REQUEST_QUEUE_SET } from '../actions/application';
import { RequestQueue } from '../performers/application';

interface RequestQueuePayload {
    payload: RequestQueue,
};

export default function* requestQueue({ payload: { positionInQueue } }: RequestQueuePayload): Generator<
    StrictEffect, 
    any, 
    any
> {
  try {
    yield put({
      type: REQUEST_QUEUE_SET,
      payload: {
        positionInQueue,
      },
    });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}