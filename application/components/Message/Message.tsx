import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';

import useLastactivity from '../../hooks/useLastactivity';

import { Props, messageContent } from './Message.interface';
import { styles } from './Message.styles';

const Message: FC<Props> = ({
  content,
  writtenBy,
  timestamp,
  images = [],
}): React.ReactElement => {
  //* -------------------------------------------------------------------------
  //* Classes for the message, they depend from writtenBy field 
  let isOperator: boolean = writtenBy === 'operator';
  let contentClass: object = isOperator
    ? styles.contentOperator
    : styles.contentClient;
  let textClass: object = isOperator ? styles.textOperator : styles.textClient;
  let informationClass: object = isOperator
    ? styles.informationOperator
    : styles.informationClient;

  //* -------------------------------------------------------------------------
  //* Content
  const IMAGES: messageContent = images.length > 0 && (
    <View style={styles.images}>
      {images.map(
        (uri: string, index: number): React.ReactElement => (
          <Image 
            style={styles.image} 
            source={{ uri }} 
            key={index}
          />
        ),
      )}
    </View>
  );

  const CONTENT: messageContent = content.length > 0 && (
    <View style={[styles.content, contentClass]}>
      <Text style={[styles.text, textClass]}>{content}</Text>
    </View>
  );

  const time = useLastactivity(timestamp); //* hook that returns last activity

  return (
    <View style={[styles.message]}>
      <View style={styles.messageInner}>
          {IMAGES}
          {CONTENT}
        <View style={[styles.information, informationClass]}>
          <Text style={[styles.writter]}>{isOperator ? writtenBy : "you"}</Text>
          <Text style={[styles.time]}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Message;