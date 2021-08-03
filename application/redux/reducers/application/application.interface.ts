import { Client } from '../../../App.interface';

export interface State {
  listener: object;
  database: {
    chatrooms: any;
    client: Client;
  };
  person: {
    name: string;
    key: string;
    theme: string;
    subtheme: string;
  };
}

export interface Action {
  type: string;
  payload: any;
}
