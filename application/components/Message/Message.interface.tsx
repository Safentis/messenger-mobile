import { Message } from '../../App.interface';

export type messageContent = React.ReactElement | boolean;
export interface Props extends Message {
    name: string,
}
