import React from 'react';
import { FC, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, Alert, Button, TextInput, StyleSheet } from 'react-native';

import { createChatroom, HandleCallback } from '../../utils/functions';

import {
  MAIN_WHITE_COLOR,
  MAIN_LIGHT_GREY_COLOR,
  MAIN_GREY_COLOR,
  MAIN_BLUE_COLOR,
} from '../../utils/consts';
import { requestPerson } from '../../redux/performers/application';
import { State } from '../../redux/reducers/application/application.interface';

type action = React.Dispatch<React.SetStateAction<string>>;
type field = [string, action];

const Question: FC = () => {
  //* ----------------------------------------------------------
  //* Redux
  const dispatch = useDispatch();

  //* ----------------------------------------------------------
  //* Ref to the themes
  const client = useSelector((state: { application: State }) => {
    return state.application.client;
  });

  //* ----------------------------------------------------------
  //* Choise
  const [name, onChangeName]: field = useState('');
  const [selectedTheme, setSelectedTheme]: field = useState('');
  const [selectedSubtheme, setSelectedSubtheme]: field = useState('');

  //* ----------------------------------------------------------
  // Set to database
  const ALERT_TITLE: string = 'Issue';
  const ALERT_FIELDS_EMPTY: string = 'Not all fields are filled';

  const handleStatus = ({ status, key }: HandleCallback): void => {
    if (status) {
      Actions.queue();
      dispatch(
        requestPerson({
          subtheme: selectedSubtheme,
          theme: selectedTheme,
          name,
          key,
        }),
      );
    }
  };

  const handleQuestion = (): void => {
    let isName: boolean = name.length > 0;
    let isTheme: boolean = selectedTheme.length > 0;
    let isSubtheme: boolean = selectedSubtheme.length > 0;
    //* If fields not empty we create a chatroom
    //* in firebase
    if (isName && isTheme && isSubtheme) {
      createChatroom(
        {
          name,
          selectedTheme,
          selectedSubtheme,
        },
        handleStatus,
      );
    } else {
      Alert.alert(ALERT_TITLE, ALERT_FIELDS_EMPTY);
    }
  };

  return (
    <View style={styles.question}>
      <View style={styles.questionBlock}>
        <Text style={styles.label}>Enter name</Text>
        <TextInput
          style={[styles.input, styles.questionInput]}
          onChangeText={onChangeName}
          value={name}
        />
      </View>

      <View style={styles.questionBlock}>
        <Text style={styles.label}>Select theme</Text>
        <View style={[styles.input, styles.questionSelect]}>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTheme(itemValue)
            }>
            {typeof client === 'object' && 'themes' in client
              ? client?.themes.map((theme: string, index: number) => (
                  <Picker.Item key={index} label={theme} value={theme} />
                ))
              : null}
          </Picker>
        </View>
      </View>

      <View style={styles.questionBlock}>
        <Text style={styles.label}>Select subtheme</Text>
        <View style={[styles.input, styles.questionSelect]}>
          <Picker
            selectedValue={selectedSubtheme}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSubtheme(itemValue)
            }>
            {typeof client === 'object' && 'subthemes' in client
              ? client?.subthemes.map((theme: string, index: number) => (
                  <Picker.Item key={index} label={theme} value={theme} />
                ))
              : null}
          </Picker>
        </View>
      </View>

      <View style={styles.questionButton}>
        <Button
          title="Enter"
          color={`${MAIN_BLUE_COLOR}`}
          onPress={handleQuestion}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: MAIN_WHITE_COLOR,
    borderColor: MAIN_LIGHT_GREY_COLOR,
    borderBottomColor: MAIN_GREY_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 18,
    paddingRight: 18,
  },
  label: {
    color: MAIN_BLUE_COLOR,
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  question: {
    margin: 5,
    padding: 20,
    paddingTop: 0,
  },
  questionBlock: {
    marginTop: 30,
  },
  questionLabel: {},
  questionInput: {
    marginTop: 5,
  },
  questionSelect: {
    marginTop: 5,
  },
  questionButton: {
    marginTop: 60,
  },
});

export default Question;
