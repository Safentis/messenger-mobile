import { call, StrictEffect } from 'redux-saga/effects';

import { Message } from '../../App.interface';

interface FetchMessages {
  chatId: string;
  message: Message;
}

interface RequestMessages {
    payload: FetchMessages
}

const fetchMessages = async ({ chatId, message }: FetchMessages): Promise<void> => {
  try {
    await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}/messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }
    );
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

/**
 * @param {object} payload
 * @param {string} payload.chatId 
 * @param {Message} payload.body
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestMessage({payload: { chatId, message } }: RequestMessages): Generator<
    StrictEffect, 
    any, 
    any
> {
    try {
        yield call(fetchMessages, { chatId, message });
    } catch (error) {
        console.error('Code ', error.code);
        console.error('Message ', error.message);
    }
}
