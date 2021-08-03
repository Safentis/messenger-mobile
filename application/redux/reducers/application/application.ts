import { State, Action } from './application.interface';
import {
  REQUEST_DATABASE_SET,
  REQUEST_LISTENER_SET,
  REQUEST_PERSON_SET,
} from '../../actions/application';

const initialState: State = {
  listener: {},
  database: {
    chatrooms: {},
    client: {
      themes: [],
      subthemes: [],
    },
  },
  person: {
    name: '',
    key: '',
    theme: '',
    subtheme: '',
  },
};

export const application = (state = initialState, { type, payload }: Action): State => {
  switch (type) {
    case REQUEST_DATABASE_SET:
      return {
        ...state,
        database: payload.database,
      };
    case REQUEST_PERSON_SET:
      return {
        ...state,
        person: payload.person,
      };
    case REQUEST_LISTENER_SET:
      return {
        ...state,
        listener: payload.listener,
      };
    default:
      return state;
  }
};
