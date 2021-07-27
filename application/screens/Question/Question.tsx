import React from 'react';
import { FC, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, Alert, Button, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { createChatroom, HandleCallback } from '../../utils/functions';
import { requestPerson } from '../../redux/performers/application';

import { State } from '../../redux/reducers/application/application.interface';
import {
  MAIN_WHITE_COLOR,
  MAIN_LIGHT_GREY_COLOR,
  MAIN_GREY_COLOR,
  MAIN_BLUE_COLOR,
} from '../../utils/consts';

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

  //* ----------------------------------------------------------
  // Component check
  const isThemes: boolean = typeof client === 'object' && 'themes' in client;
  const isSubthemes: boolean = typeof client === 'object' && 'subthemes' in client;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.question}>
          <Text style={styles.questionTitle}>
            Create question
          </Text>

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
                {isThemes
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
                {isSubthemes
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  question: {
    paddingTop: 50
  },
  questionTitle: {
    fontSize: 30,
    marginBottom: 30,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  questionBlock: {
    marginTop: 30,
  },
  questionLabel: {
    
  },
  questionInput: {
    // marginTop: 5,
    paddingLeft: 18,
  },
  questionSelect: {
    // marginTop: 5,
  },
  questionButton: {
    marginTop: 60,
  },
  input: {
    backgroundColor: MAIN_WHITE_COLOR,
    borderColor: MAIN_LIGHT_GREY_COLOR,
    borderBottomColor: MAIN_GREY_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    paddingRight: 18,
    fontWeight: 'bold'
  },
  label: {
    color: MAIN_BLUE_COLOR,
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'left',
  },
});

export default Question;
