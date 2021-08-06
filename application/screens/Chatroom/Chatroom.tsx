import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import { View, ToastAndroid } from 'react-native';

import { useGlobalContext } from '../../App';
import { getDownloadURL } from '../../utils/functions';
import Preview from './Preview/Preview';
import Namebar from './Namebar/Namebar';
import Messages from './Messages/Messages';
import Inputbar from './Inputbar/Inputbar';
import {
  requestListener,
  requestMessage,
} from '../../redux/performers/application';

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
  imageType,
} from './Chatroom.interface';

const Chatroom: FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const [message, onChangeMessage]: fieldType = useState<string>('');

  //* ---------------------------------------------------------------------
  //* Toast
  const toastMessage = (content: string): void => {
    ToastAndroid.showWithGravityAndOffset(
      content,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  //* ---------------------------------------------------------------------
  //* Handle image
  const [url, setUrl]: imageType = useState<string>('');

  const handleAddImage = async (camera: RNCamera, optionsSnapshot: object) => {
    toastMessage('Please wait, image upload !');
    const data: TakePictureResponse = await camera.takePictureAsync(optionsSnapshot);
    const url: string = (await getDownloadURL(data)) as string;
    setUrl(url);
  };

  const handleDeleteImage = () => {
    setUrl('');
  };

  //* ---------------------------------------------------------------------
  //* In this case we are getting our chatroom and person
  const { chatroom, person, operatorId } = useSelector(
    (state: { application: State }): UseSelectorReturn => {
      const person: Person = state.application.person;
      const chatroom: ChatroomInterface =
        state.application.database.chatrooms[person.key];
      const operatorId: string = chatroom?.operatorId;
      return {
        chatroom,
        person,
        operatorId,
      };
    },
  );

  //* ---------------------------------------------------------------------
  //*                         PUBNUB SECTION
  //* ---------------------------------------------------------------------
  //* Here we obtain PubNub instance
  const { pubnub } = useGlobalContext();
  const chatroomChannel: string = `room-${person.key}`;
  const [channels]: [string[], Function] = useState<string[]>([
    chatroomChannel,
  ]);
  const [isTyping, setIsTyping]: typingType = useState<boolean>(false);
  const [messages, setMessages]: messageType = useState<MessageInterface[]>(
    chatroom?.messages ? Object.values(chatroom.messages) : [],
  );

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
    setMessages(chatroom?.messages ? Object.values(chatroom.messages) : []);

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
  const handleKeyUp = async () => {
    let inputHasText = message.length > 0;

    if (inputHasText || !inputHasText) {
      await pubnub.signal({
        channel: chatroomChannel,
        message: inputHasText ? '1' : '0',
      });
    }
  };

  const handleSubmit = async () => {
    let isMessage: boolean = message.trim().length > 0;
    let isUrl: boolean = url.length > 0;
    let date: Date = new Date();

    if (isMessage || isUrl) {
      //* Resent input state
      onChangeMessage('');

      //* Send signal to the channel `room-{person-key}`
      //* about ending of a type message
      await pubnub.signal({
        channel: chatroomChannel,
        message: '0',
      });

      // Publish our message to the channel `room-{person-key}`
      await pubnub.publish({
        channel: chatroomChannel,
        message: {
          content: message,
          writtenBy: 'client',
          images: isUrl ? [url] : [],
          timestamp: date,
        },
      });

      setUrl('');
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
        handleAddImage={handleAddImage}
        handleKeyUp={handleKeyUp}
        handleSubmit={handleSubmit}
        onChangeMessage={onChangeMessage}
      />
      <Preview 
        image={url} 
        handleDeleteImage={handleDeleteImage} 
      />
    </View>
  );
};

export default Chatroom;
