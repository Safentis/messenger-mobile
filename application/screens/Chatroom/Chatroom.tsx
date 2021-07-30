import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PubNubProvider } from 'pubnub-react';
import { Animated, Easing, View } from 'react-native';
import PubNub from 'pubnub';
import { usePubNub } from 'pubnub-react';
import Pubnub from 'pubnub';

import Namebar from './Namebar/Namebar';
import Messages from './Messages/Messages';
import Inputbar from './Inputbar/Inputbar';
import usePubnub from '../../hooks/usePabnab';
import {
  requestMessage,
  requestPerson,
} from '../../redux/performers/application';

import { styles } from './Chatroom.styles';
import { State } from '../../redux/reducers/application/application.interface';
import { Message as MessageInterface, Person } from '../../App.interface';
import {
  Signal,
  Envelope,
  chatroomType,
  fieldType,
  typingType,
  messageType,
} from './Chatroom.interface';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-4e5c7380-df58-11eb-b709-22f598fbfd18',
  publishKey: 'pub-c-d4239ce3-2f26-42a7-9b3c-730ce6e7510f',
  ssl: true,
  presenceTimeout: 130,
});

const Chatroom = () => {
  return (
    <PubNubProvider client={pubnub}>
      <ChatroomInner />
    </PubNubProvider>
  );
};

const ChatroomInner: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [message, onChangeMessage]: fieldType = useState('');

  //* ---------------------------------------------------------------------
  //* In this case we are getting our chatroom and person
  const { chatroom, person } = useSelector((state: { application: State }) => {
    const person: Person = state.application.person;
    const personKey: string = person.key; // chat id
    const chatrooms: chatroomType[] = Object.entries(
      state.application.chatrooms, // get all chatrooms
    );

    const chatroom: chatroomType = chatrooms.find(
      ([key, value]: chatroomType) => {
        return key === personKey; // if chatroom exist, find returns it
      },
    ) as chatroomType;

    return { chatroom, person };
  });

  //* ---------------------------------------------------------------------
  //*                         PUBNUB SECTION
  //* ---------------------------------------------------------------------

  //* Here we obtain PubNub instance
  const pubnub: Pubnub = usePubNub(); //* Include pubnub
  const allMessages: MessageInterface[] = Object.values(chatroom[1].messages);
  const chatroomChannel: string = `room-${person.key}`; //* main channel
  const [isTyping, setIsTyping]: typingType = useState(false);
  const [messages, setMessages]: messageType = useState(allMessages);

  //* ---------------------------------------------------------------------
  //* Pubnub listeners
  const handleSignal = (signal: Signal) => {
    if (signal.publisher !== 'client') {
      if (signal.message.toString() === '1') {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    }
  };

  const opacity: Animated.Value = new Animated.Value(0);

  // Will change fadeAnim value to 1 in 5 seconds
  const animate = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const handleMessage = ({ message }: Envelope) => {
    setMessages((msgs: MessageInterface[]) => [...msgs, message]);
    
    if (message.writtenBy === 'client') {
      dispatch(
        requestMessage(person.key, {
          ...message,
        }),
      );
    }
  };

  useEffect(() => {
    if (pubnub) {
      const listener = {
        message: handleMessage,
        signal: handleSignal,
      };

      pubnub.setUUID('client');
      pubnub.addListener(listener);
      pubnub.subscribe({ channels: [chatroomChannel] });
      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [pubnub]);

  //* ---------------------------------------------------------------------
  //* Pubnub handlers
  const handleKeyUp = () => {
    let inputHasText = message.length > 0;

    if (inputHasText || !inputHasText) {
      pubnub.signal({
        channel: chatroomChannel,
        message: inputHasText ? '1' : '0',
      });
    }
  };

  const handleSubmit = () => {
    let isMessage: boolean = message.trim().length > 0;
    let date: Date = new Date();

    if (isMessage) {
      onChangeMessage('');

      pubnub.signal({
        channel: chatroomChannel,
        message: '0',
      });

      // Publish our message to the channel `room-{person-key}`
      pubnub.publish({
        channel: chatroomChannel,
        message: {
          content: message,
          writtenBy: 'client',
          images: [],
          timestamp: date,
        },
      });
    }
  };

  //* ---------------------------------------------------------------------
  //*                         END - PUBNUB SECTION
  //* ---------------------------------------------------------------------

  return (
    <View style={styles.chatroom}>
      <Namebar messagesLength={messages.length} />
      <Messages 
        isTyping={isTyping}
        messages={messages}
        person={person}
        opacity={opacity}
      />
      <Inputbar
        message={message}
        handleKeyUp={handleKeyUp}
        handleSubmit={handleSubmit}
        onChangeMessage={onChangeMessage}
      />
    </View>
  );
};

export default Chatroom;
