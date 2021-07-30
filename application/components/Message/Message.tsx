import React, { FC } from 'react';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

import { Props, messageContent } from './Message.interface';

import { styles } from './Message.styles';


const Message: FC<Props> = ({
  content,
  writtenBy,
  timestamp,
  images = [],
  name,
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

  return (
    <View style={[styles.message]}>
      <View style={styles.messageInner}>
          {IMAGES}
          {CONTENT}
        <View style={[styles.information, informationClass]}>
          <Text style={[styles.writter]}>{isOperator ? writtenBy : name}</Text>
          <Text style={[styles.time]}>{timestamp}</Text>
        </View>
      </View>
    </View>
  );
};

export default Message;