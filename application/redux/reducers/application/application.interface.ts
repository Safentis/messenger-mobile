import { Database } from '../../../App.interface';

export interface State {
  listener: object;
  database: Database;
  person: {
    name: string;
    key: string;
    theme: string;
    subtheme: string;
  };
}

export interface Action {
  type: string;
  payload: State;
}
