import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { Props } from './Typing.interface';
import { styles } from './Typing.styles';

const Typing: FC<Props> = ({ isTyping }): React.ReactElement => {
  return (
    <View style={styles.typing}>
      <Text style={styles.typingMessage}>
        {isTyping ? 'operator typing message...' : null}
      </Text>
    </View>
  );
};

export default Typing;
