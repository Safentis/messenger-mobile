import Pubnub from "pubnub";

export type DateType = string | number | Date;

export interface Chatroom {
  begun: DateType
  client: string
  created: DateType
  messages: Message
  operatorId: string
  operator: string
  saved: string
  score: string | number | null 
  status: string
  theme: string
  subtheme: string
  complited: DateType
}

export interface Client {
  themes: string[]
  subthemes: string[]
}

export interface Message {
  content: string
  timestamp: DateType
  writtenBy: string
  images: string[]
}

export interface Person {
  name: string
  key: string
  theme: string
  subtheme: string
};

export interface User {
  name: string
  email?: string
  photo?: string
  status?: string | boolean
}

export interface Chatrooms {
  [key: string]: Chatroom;
}

export interface GlobalContextInterface {
  pubnub: Pubnub;
}