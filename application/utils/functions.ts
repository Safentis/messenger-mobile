import database, {
  firebase,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';

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
    console.error(error.status);
    console.error(error.message);
    callback({ status: false, key: '' });
  }
};