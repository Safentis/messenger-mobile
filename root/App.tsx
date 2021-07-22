import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const App: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messenger-Mobile!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    height: '100%',
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
