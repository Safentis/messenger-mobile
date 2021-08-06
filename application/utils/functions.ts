import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import { TakePictureResponse } from 'react-native-camera';
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
  const complited = firebase.database.ServerValue.TIMESTAMP;
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
          complited,
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

export const getDownloadURL = (data: TakePictureResponse) => {
  const name: string = Math.random().toString(32).slice(2, 12);
  const base64: string = data.base64 as string;
  const params: object = { contentType: 'image/jpg' };
  const uploadTask: FirebaseStorageTypes.Task = storage()
      .ref('images/' + name)
      .putString(base64, 'base64', params);

  return new Promise((resolve) => {
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            throw new Error(
              `User doesn't have permission to access the object`
            );
            break;
          case "storage/canceled":
            throw new Error(`User canceled the upload`);
            break;
          case "storage/unknown":
            throw new Error(
              `Unknown error occurred, inspect error.serverResponse`
            );
            break;
        }
      },
      () => {
        uploadTask?.snapshot?.ref.getDownloadURL().then((downloadURL: string) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};