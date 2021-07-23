import React from 'react';
import {
  FC, 
  useState,
  useEffect
} from 'react';
import {
  Text, 
  View, 
  TextInput, 
  StyleSheet, 
  Picker, 
  Button,
  Alert
} from 'react-native';

import database from '@react-native-firebase/database';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';

interface Client {
  themes: string[]
  subthemes: string[]
}

type Snapshot = FirebaseDatabaseTypes.DataSnapshot;
type Referece = FirebaseDatabaseTypes.Reference;

const Question: FC = () => {
  //* ----------------------------------------------------------
  //* Client themes 
  const [client, setClient]: [Client, Function] = useState({
    themes: [],
    subthemes: [],
  });
  

  //* ----------------------------------------------------------
  //* Get client themes from database
  useEffect(() => {
    try {
      let ref: Referece;
      
      ref = database().ref('client');
      ref.on('value', (snapshot: Snapshot) => {
        setClient(snapshot.val());
      });

    } catch (err) {
      console.error(err);
      console.error(err.stack);
    }
  }, []);
  

  //* ----------------------------------------------------------
  //* Choise
  const [name, onChangeName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedSubtheme, setSelectedSubtheme] = useState('');

  return (
    <View style={styles.question}>
      <View style={styles.questionBlock}>
        <Text style={styles.questionLabel}>Enter name</Text>
        <TextInput
          style={styles.questionInput}
          onChangeText={onChangeName}
          value={name}
        />
      </View>

      <View style={styles.questionBlock}>
        <Text style={styles.questionLabel}>Select theme</Text>
        <View style={styles.questionInput}>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTheme(itemValue)
            }>
              {client?.themes && 
               client?.themes
                .map((theme: string, index: number) => (
                  <Picker.Item 
                    key={index} 
                    label={theme} 
                    value={theme} 
                  />
              ))}
          </Picker>
        </View>
      </View>

      <View style={styles.questionBlock}>
        <Text style={styles.questionLabel}>Select subtheme</Text>
        <View style={styles.questionInput}>
          <Picker
            selectedValue={selectedSubtheme}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSubtheme(itemValue)
            }>
            {client?.subthemes && 
             client?.subthemes
              .map((theme: string, index: number) => (
                <Picker.Item 
                  key={index} 
                  label={theme} 
                  value={theme} 
                />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.questionBlock}>
        <Button
          title="Enter to chat"
          color="#808080"
          onPress={() => Alert.alert('Enter to caht')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    padding: 20,
  },
  questionBlock: {
    marginTop: 40,
  },
  questionLabel: {
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  questionInput: {
    backgroundColor: '#f8f8ff',
    borderColor: '#808080',
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 0.5,
    marginTop: 5,
  },
  questionButton: {
    color: '#808080',
  }
});

export default Question;
