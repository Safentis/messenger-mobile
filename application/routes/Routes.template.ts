import Question from '../screens/Question/Question';
import Queue from '../screens/Queue/Queue';
import Chatroom from '../screens/Chatroom/Chatroom';
import Camera from '../screens/Camera/Camera';
import Complite from '../screens/Complite/Complite';

export interface Route {
  key: string;
  title: string;
  hideNavBar: boolean;
  initial?: boolean;
  component: any;
}

export const routes: Route[] = [
  {
    key: 'question',
    title: 'Question',
    hideNavBar: true,
    initial: true,
    component: Question,
  },
  {
    key: 'queue',
    title: 'Queue',
    hideNavBar: true,
    initial: false,
    component: Queue,
  },
  {
    key: 'chatroom',
    title: 'Chatroom',
    hideNavBar: true,
    initial: false,
    component: Chatroom,
  },
  {
    key: 'camera',
    title: 'Camera',
    hideNavBar: true,
    initial: false,
    component: Camera,
  },
  {
    key: 'complite',
    title: 'Complite',
    hideNavBar: true,
    initial: false,
    component: Complite,
  },
];
