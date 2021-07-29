import { Chatroom, Message } from '../../App.interface';

export interface Signal {
  channel: string;
  message: number;
  publisher: string;
  subscription: null | string;
  timetoken: string | number | Date;
}

export interface Envelope {
  message: Message;
  publisher: string;
  timetoken: string | number | Date;
}

export type chatroomType = [string, Chatroom];
export type fieldType = [string, React.Dispatch<React.SetStateAction<string>>];
export type messageType = [Message[], Function];
export type typingType = [boolean, Function];