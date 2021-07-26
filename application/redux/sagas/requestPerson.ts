import { put, StrictEffect } from 'redux-saga/effects';

import { REQUEST_PERSON_SET } from '../actions/application';
import { RequestPerson } from '../performers/application'

interface RequestPersonPayload {
    payload: {
      person: RequestPerson
    }
};

export default function* requestPerson({ payload: { person } }: RequestPersonPayload): Generator<
    StrictEffect, 
    any, 
    any
> {
  try {
    yield put({
      type: REQUEST_PERSON_SET,
      payload: {
        person,
      },
    });
  } catch (err) {
    console.error('Code ', err.code);
    console.error('Message ', err.message);
  }
}