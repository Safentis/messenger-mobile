import React from 'react';
import { 
    useEffect,
    useState,
} from 'react';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import database from '@react-native-firebase/database';

type Snapshot = FirebaseDatabaseTypes.DataSnapshot;
type Referece = FirebaseDatabaseTypes.Reference;

type Ref = string | undefined
type Callback = (data: any) => any;

const useDatabase = (ref: Ref, callback: Callback): any => {

    useEffect(() => {
      try {
        let databaseRef: Referece;
        
        if (typeof ref === undefined) {
          databaseRef = database().ref();
        } else {
          databaseRef = database().ref(ref);
        }

        databaseRef.on('value', (snapshot: Snapshot) => {
          callback(snapshot.val());
        });
      } catch (err) {
        console.error(err);
        console.error(err.stack);
      }
    }, []);

    return null;
};

export default useDatabase