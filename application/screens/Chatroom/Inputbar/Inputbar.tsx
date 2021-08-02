import React, { FC } from 'react';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Props } from './Inputbar.interface';
import { styles } from './Inputbar.styles';
import { MAIN_BLUE_COLOR, MAIN_DARK_GREY_COLOR } from '../../../utils/consts';

const Inputbar: FC<Props> = ({
  message,
  onChangeMessage,
  handleKeyUp,
  handleSubmit,
}) => {
  return (
    <View style={styles.inputbar}>
      <TextInput
        style={[styles.inputbarTextField, styles.textField]}
        value={message}
        onChangeText={onChangeMessage}
        onKeyPress={handleKeyUp}
        placeholder="Type your message..."
        placeholderTextColor={MAIN_DARK_GREY_COLOR}
      />
      <View style={styles.inputbarButtons}>
        <TouchableOpacity 
          style={[styles.inputbarButton]} 
          onPress={handleSubmit}
        >
          <FontAwesomeIcon
            style={[styles.inputbarIcon, styles.iconSend]}  
            icon={faPaperPlane} 
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inputbarButton]}
          onPress={() => Actions.camera()}
        >
          <FontAwesomeIcon 
            style={[styles.inputbarIcon, styles.iconClip]}
            icon={faPaperclip} 
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Inputbar;
