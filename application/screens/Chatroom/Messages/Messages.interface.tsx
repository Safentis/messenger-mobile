import { Message, Person } from '../../../App.interface';

export interface Props {
  messages: Message[];
  person: Person;
  isTyping: boolean;
}
