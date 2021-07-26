import { State, Action } from './application.interface';
import { 
    REQUEST_CHATROOMS_SET,
    REQUEST_CLIENT_SET,
    REQUEST_PERSON_SET, 
    REQUEST_QUEUE_SET 
} from '../../actions/application';

const initialState: State = {
    chatrooms: {},
    client   : {},
    positionInQueue: 0,
    person: {
        name: '',
        key: '',
        theme: '',
        subtheme: '',
    },
};

export const application = (state = initialState, { type, payload }: Action): State => {
    
    switch (type) {
        case REQUEST_CHATROOMS_SET:
            return {
                ...state,
                chatrooms: payload.chatrooms,
            };
        case REQUEST_QUEUE_SET:
            return {
                ...state,
                positionInQueue: payload.positionInQueue,
            };
        case REQUEST_PERSON_SET:
            return {
                ...state,
                person: payload.person,
            };
        case REQUEST_CLIENT_SET:
            return {
                ...state,
                client: payload.client,
            }
        default:
            return state;
    };
};