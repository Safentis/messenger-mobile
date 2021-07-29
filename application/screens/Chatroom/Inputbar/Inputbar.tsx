import React, { FC } from 'react';
import { 
    Button, 
    TextInput, 
    View 
} from 'react-native';

import { styles } from './Inputbar.styles';

import { Props } from './Inputbar.interface';
import { 
    MAIN_BLUE_COLOR, 
    MAIN_WHITE_COLOR 
} from '../../../utils/consts';

const Inputbar: FC <Props> = ({message, onChangeMessage, handleKeyUp, handleSubmit}) => {
  return (
    <View style={styles.inputbar}>
      <TextInput
        style={[styles.inputbarTextField, styles.textField]}
        value={message}
        onChangeText={onChangeMessage}
        onKeyPress={handleKeyUp}
        placeholder="Type message heare..."
        placeholderTextColor={MAIN_WHITE_COLOR}
      />
      <View style={styles.inputbarButtons}>
        <View style={styles.inputbarButton}>
          <Button
            title="Send"
            color={`${MAIN_BLUE_COLOR}`}
            onPress={handleSubmit}
          />
        </View>
        <View style={styles.inputbarButton}>
          <Button
            title="Add file"
            color={`${MAIN_BLUE_COLOR}`}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default Inputbar