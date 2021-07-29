import React, { useEffect, useState } from 'react';
import { usePubNub } from 'pubnub-react';
import Pubnub from 'pubnub';

import { Message, Person } from '../App.interface';
import { Envelope, Signal } from '../screens/Chatroom/Chatroom.interface';

interface Props {
  chatroomChannel: string
  handleSignal: (signal: Signal) => void 
  handleMessage: (envelope: Envelope) => void
}

const usePubnub = ({chatroomChannel, handleMessage, handleSignal}: Props) => {
  const pubnub: Pubnub = usePubNub(); //* Include pubnub
  
  useEffect(() => {
    if (pubnub) {
      pubnub.setUUID('client');

      const listener = {
        message: handleMessage,
        signal: handleSignal,
      };

      pubnub.addListener(listener);
      pubnub.subscribe({ channels: [chatroomChannel] });
      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [pubnub]);

  return pubnub;
};

export default usePubnub;
