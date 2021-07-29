import { 
    REQUEST_CHATROOMS, 
    REQUEST_CLIENT, 
    REQUEST_MESSAGE, 
    REQUEST_PERSON, 
    REQUEST_QUEUE 
} from '../actions/application';

import { Chatroom, Client, Message, Person } from '../../App.interface';

export interface RequestQueue {
    positionInQueue: number
}

export const requestQueue = ({ positionInQueue }: RequestQueue) => {
    return {
        type: REQUEST_QUEUE,
        payload: {
            positionInQueue,
        },
    };
};


export const requestPerson = (person: Person) => {
    return {
        type: REQUEST_PERSON,
        payload: {
            person,
        },
    };
};


export interface RequestChatrooms {
    chatrooms: Chatroom
}

export const requestChatrooms = (chatrooms: RequestChatrooms) => {
    return {
        type: REQUEST_CHATROOMS,
        payload: {
            chatrooms,
        },
    };
};


export interface RequestClient {
    client: Client
};

export const requestClient = (client: RequestClient) => {
    return {
        type: REQUEST_CLIENT,
        payload: {
            client,
        },
    };
};


export const requestMessage = (chatId: string, message: Message) => {
    return {
        type: REQUEST_MESSAGE,
        payload: {
            chatId,
            message
        }
    }
}