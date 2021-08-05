import database, {
  firebase,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import { Person, User } from '../App.interface';

import { DIALOG_STATUS, DIALOG_ID } from './consts';

export interface CreateChatroom {
  name: string;
  selectedTheme: string;
  selectedSubtheme: string;
}

export interface HandleCallback {
  status: boolean;
  key: string;
}

type callbackfunc = ({ status, key }: HandleCallback) => void;
type databasereftype = FirebaseDatabaseTypes.Reference;

export const handleError = (error: Error): never | void => {
  console.error('\nERROR: ', error);
  console.error('\nERROR_MESSAGE: ', error.message);
  console.error('\nERROR_STACK: ', error.stack);
};

export const createChatroom = async (
  {
    name: client,
    selectedTheme: theme,
    selectedSubtheme: subtheme,
  }: CreateChatroom,
  callback: callbackfunc,
) => {
  try {
    let timestamp = firebase.database.ServerValue.TIMESTAMP;
    let databaseRef: databasereftype = await database().ref('chatrooms');
    let databaseKey: string = databaseRef.push().key as string;
    let fields = {
      [databaseKey]: {
        client,
        operatorId: DIALOG_ID,
        created: timestamp,
        status: DIALOG_STATUS,
        subtheme,
        theme,
        messages: null,
        saved: 'nosaved',
        score: null,
      },
    };

    databaseRef.update(fields).then(() => {
      callback({ status: true, key: databaseKey });
    });
  } catch (error) {
    handleError(error);
    callback({ status: false, key: '' });
  }
};

export const complitedDialog = async (person: Person, score: number): Promise<void> => {
  try {
    await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${person.key}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'complited',
          score,
        }),
      },
    );
  } catch(error) {
    handleError(error);
  }
}

export const fetchUser = async (operatorId: string) => {
  try {
    const req = await fetch(`https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/users/${operatorId}.json`);
    const res = await req.json();
    return res;
  } catch (error) {
    handleError(error);
  }
}

interface CreateUser {
  uid: string;
  user: User;
}

export const createUser = async ({uid, user}: CreateUser): Promise<void> => {
  try {
    await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
        }),
      }
    );
  } catch(error) {
    handleError(error);
  }
};