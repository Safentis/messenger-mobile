export interface Chatroom {
  client: string;
  created: string | number | Date;
  messages: Message | null;
  operatorId: string;
  saved: string;
  score: string | null;
  status: string;
  theme: string;
  subtheme: string;
}

export interface Client {
  theme: string[];
  subthemes: string[];
}

export interface Message {
  content: string;
  timestamp: string | number;
  writtenBy: string;
}

export interface Database {
  chatrooms: Chatroom | null;
  client: Client;
}
