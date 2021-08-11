import React, { FC, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  EmitterSubscription,
  Keyboard,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from 'react-native';

import Message from '../../../components/Message/Message';
import Typing from '../../../components/Typing/Typing';

import { Message as MessageInterface } from '../../../App.interface';
import { Props } from './Messages.interface';
import { styles } from './Messages.styles';

const Messages: FC<Props> = ({ messages = [], person, isTyping }) => {
  const scrollView: React.MutableRefObject<null | any> = useRef(null);
  const handleScroll = () => {
    scrollView.current.scrollToEnd({
      animated: true,
    });
  };

  useEffect(() => {
    let keybordDidListener: EmitterSubscription;
    keybordDidListener = Keyboard.addListener('keyboardDidShow', handleScroll);
    return () => {
      keybordDidListener.remove();
    };
  });

  return (
    <View style={styles.messages}>
      <SafeAreaView>
        <ScrollView ref={scrollView} onContentSizeChange={handleScroll}>
          {messages.length > 0 ? (
            messages
              .sort(
                (
                  messageA: MessageInterface,
                  messageB: MessageInterface,
                ): number =>
                  +new Date(messageA.timestamp) - +new Date(messageB.timestamp),
              )
              .map((message: MessageInterface, index: number) => (
                <Message {...message} key={index} name={person.name} />
              ))
          ) : (
            <View style={styles.sign}>
              <Text style={styles.signText}>
                No messages
              </Text>
              <FontAwesomeIcon 
                style={[styles.signIcon]} 
                size={25}
                icon={faEnvelope}
              />
            </View>
          )}
          <Typing isTyping={isTyping} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Messages;
