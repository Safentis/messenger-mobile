import { Animated } from 'react-native';
import { Message, Person } from '../../../App.interface';

export interface Props {
    messages: Message[],
    person: Person,
    isTyping: boolean,
    opacity: Animated.Value
};