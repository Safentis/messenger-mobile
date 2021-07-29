export interface Chatroom {
  begun: string | number | Date
  client: string
  created: string | number | Date
  messages: Message
  operatorId: string
  saved: string
  score: string | null
  status: string
  theme: string
  subtheme: string
}

export interface Client {
  theme: string[]
  subthemes: string[]
}

export interface Message {
  content: string
  timestamp: string | number | Date
  writtenBy: string
  images: string[]
}

export interface Database {
  chatrooms: Chatroom | null
  client: Client
}

export interface Person {
  name: string
  key: string
  theme: string
  subtheme: string
};