import { put, StrictEffect } from 'redux-saga/effects';
import { Database } from '../../App.interface';

import { REQUEST_DATABASE_SET } from '../actions/application';

interface RequestClientPayload {
  payload: {
    database: Database;
  };
}

/**
 * @param {object} payload
 * @param {Database} payload.database
 * @returns {Generator <StrictEffect, void, any>}
 */
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