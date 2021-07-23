import {AppRegistry} from 'react-native';

// import firebase from '@react-native-firebase/app';

import App from './application/App';
import {name as appName} from './app.json';

// // FIREBASE
// const credentials = {
//   clientId: '476615363227-m192aecep9df5p4sdpv4dm1n3pgp8mg4.apps.googleusercontent.com',
//   appId: '1:476615363227:android:0f067725f22d3b5139543e',
//   apiKey: 'AIzaSyDSbXdhXT4bJ5E28Y98KFRHTsw0d6KFw2g',
//   databaseURL: 'https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app',
//   storageBucket: 'messenger-b15ea.appspot.com',
//   messagingSenderId: '476615363227',
//   projectId: 'messenger-b15ea',
// };

// const config = {
//   name: 'REACT_NATIVE_APP',
// };

// firebase.initializeApp(credentials, config);

AppRegistry.registerComponent(appName, () => App);
