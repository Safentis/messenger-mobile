import { call, StrictEffect } from 'redux-saga/effects';

import { Message } from '../../App.interface';
import { fetchMessages } from '../../utils/functions';

export interface FetchMessages {
  chatId: string;
  message: Message;
}

interface RequestMessages {
    payload: FetchMessages
}

/**
 * @param {object} payload
 * @param {string} payload.chatId 
 * @param {Message} payload.body
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestMessage({payload: { chatId, message } }: RequestMessages): Generator<
    StrictEffect, 
    void, 
    any
> {
    try {
        yield call(fetchMessages, { chatId, message });
    } catch (error) {
        console.error('Code ', error.code);
        console.error('Message ', error.message);
    }
}
