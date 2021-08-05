import React from 'react';
import { FC, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Text, 
  View, 
  Alert, 
  Button, 
  TextInput, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity 
} from 'react-native';


import { State } from '../../redux/reducers/application/application.interface';
import { styles } from './Question.styles';
import { requestPerson } from '../../redux/performers/application';
import { createChatroom, createUser, HandleCallback } from '../../utils/functions';

type action = React.Dispatch<React.SetStateAction<string>>;
type field = [string, action];

const Question: FC = (): React.ReactElement => {
  //* ----------------------------------------------------------
  //* Redux
  const dispatch = useDispatch();

  //* ----------------------------------------------------------
  //* Ref to the themes
  const client = useSelector((state: { application: State }) => {
    return state.application?.database?.client;
  });
  
  // Object client check
  const isObject: boolean = typeof client === 'object';
  const isThemes: boolean =  isObject && 'themes' in client;
  const isSubthemes: boolean = isObject && 'subthemes' in client;
  
  let themesStartValue = isThemes ? client.themes[0] : '';
  let subthemesStartValue = isSubthemes ? client.subthemes[0] : '';
  
  //* ----------------------------------------------------------
  //* Choise
  const [name, onChangeName]: field = useState('');
  const [selectedTheme, setSelectedTheme]: field = useState(themesStartValue);
  const [selectedSubtheme, setSelectedSubtheme]: field = useState(subthemesStartValue);

  //* ----------------------------------------------------------
  // Set to database
  const ALERT_TITLE: string = 'Issue';
  const ALERT_FIELDS_EMPTY: string = 'Not all fields are filled';
  
  const handleStatus = async ({ status, key }: HandleCallback): Promise<void> => {
    if (status) {
      Actions.queue();
      await createUser({uid: key, user: { name }});
      await dispatch(
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
        handleStatus, //* callback func is second arg
      );
    } else {
      Alert.alert(ALERT_TITLE, ALERT_FIELDS_EMPTY);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.question}>
          <Text style={styles.questionTitle}>
            question
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

          <TouchableOpacity style={styles.questionButton} onPress={handleQuestion}>
            <Text style={[styles.label, styles.questionButtonText]}>
              Enter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default Question;
