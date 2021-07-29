import React, { FC, useEffect, useRef } from 'react';
import {
  EmitterSubscription,
  Keyboard,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import Message from '../../../components/Message/Message';
import Typing from '../../../components/Typing/Typing';

import { styles } from './Messages.styles';
import { Props } from './Messages.interface';
import { Message as MessageInterface } from '../../../App.interface';

const Messages: FC<Props> = ({ messages, person, isTyping }) => {
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
          {messages &&
            messages
              .sort(
                (
                  messageA: MessageInterface,
                  messageB: MessageInterface,
                ): number =>
                  +new Date(messageA.timestamp) - +new Date(messageB.timestamp),
              )
              .map((message: MessageInterface, index: number) => (
                <Message key={index} name={person.name} {...message} />
              ))
          }
          <Typing isTyping={isTyping} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Messages;
