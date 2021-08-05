import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';

import Namebar from './Namebar/Namebar';
import Messages from './Messages/Messages';
import Inputbar from './Inputbar/Inputbar';
import { requestListener, requestMessage } from '../../redux/performers/application';
import { useGlobalContext } from '../../App'

import { State } from '../../redux/reducers/application/application.interface';
import { styles } from './Chatroom.styles';
import { 
  Message as MessageInterface, 
  Chatroom as ChatroomInterface,  
  Person,
} from '../../App.interface';
import {
  Signal,
  Envelope,
  UseSelectorReturn,
  fieldType,
  typingType,
  messageType,
} from './Chatroom.interface';

const Chatroom: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [message, onChangeMessage]: fieldType = useState('');

  //* ---------------------------------------------------------------------
  //* In this case we are getting our chatroom and person
  const { chatroom, person, operatorId } = useSelector((state: { application: State }): UseSelectorReturn => {
    const person: Person = state.application.person;
    const chatroom: ChatroomInterface = state.application.database.chatrooms[person.key];
    const operatorId: string = chatroom?.operatorId
    return { 
      chatroom,
      person,
      operatorId
    };
  });

  //* ---------------------------------------------------------------------
  //*                         PUBNUB SECTION
  //* ---------------------------------------------------------------------
  //* Here we obtain PubNub instance
  const { pubnub } = useGlobalContext();
  const chatroomChannel: string = `room-${person.key}`;
  const [channels]: [string[], Function] = useState<string[]>([chatroomChannel]);
  const [isTyping, setIsTyping]: typingType = useState<boolean>(false);
  const [messages, setMessages]: messageType = useState<MessageInterface[]>(chatroom?.messages ? Object.values(chatroom.messages) : []);

  //* ---------------------------------------------------------------------
  //* Pubnub listeners
  const handleSignal = (signal: Signal): void => {
    if (signal.publisher !== 'client') {
      if (signal.message.toString() === '1') {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    }
  };

  const handleMessage = ({ message }: Envelope): void => {
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
    //* Set start messages to chat
    // setMessages(chatroom.messages);
    
    let listener = {
      message: handleMessage,
      signal: handleSignal,
    };

    //* Set listener in store that, remove letter
    dispatch(requestListener(listener));

    pubnub.setUUID('client');
    pubnub.addListener(listener);
    pubnub.subscribe({ channels });
    return () => {
      pubnub.removeListener(listener);
      pubnub.unsubscribeAll();
    };
  }, [pubnub, channels]);

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
      //* Resent input state
      onChangeMessage('');
      //* Send signal to the channel `room-{person-key}` 
      //* about ending of a type message
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
      <Namebar 
        messagesLength={messages.length} 
        operatorId={operatorId}
      />
      <Messages
        isTyping={isTyping}
        messages={messages}
        person={person}
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
