import { 
    REQUEST_DATABASE, 
    REQUEST_LISTENER, 
    REQUEST_MESSAGE, 
    REQUEST_PERSON, 
} from '../actions/application';

import { Chatroom, Client, Message, Person } from '../../App.interface';

export const requestPerson = (person: Person) => {
    return {
        type: REQUEST_PERSON,
        payload: {
            person,
        },
    };
};

export const requestDatabase = (database: { chatrooms: Chatroom, client: Client }) => {
    return {
        type: REQUEST_DATABASE,
        payload: {
            database
        }
    }
}

export const requestMessage = (chatId: string, message: Message) => {
    return {
        type: REQUEST_MESSAGE,
        payload: {
            chatId,
            message
        }
    }
}

export const requestListener = (listener: object) => {
    return {
        type: REQUEST_LISTENER,
        payload: {
            listener,
        },
    };
};