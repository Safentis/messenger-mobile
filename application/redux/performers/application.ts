import { 
    REQUEST_CHATROOMS, 
    REQUEST_CLIENT, 
    REQUEST_PERSON, 
    REQUEST_QUEUE 
} from '../actions/application';

import { Chatroom, Client } from '../../App.interface';

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


export interface RequestPerson {
    name: string
    key: string
    theme: string
    subtheme: string
};

export const requestPerson = (person: RequestPerson) => {
    return {
        type: REQUEST_PERSON,
        payload: {
            person,
        },
    };
};


export interface RequestChatrooms {
    chatrooms: any
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
    client: any
};

export const requestClient = (client: RequestClient) => {
    return {
        type: REQUEST_CLIENT,
        payload: {
            client,
        },
    };
};