import { IChat } from '../../../Chat';
import { IMessage } from '../../../Message';

export interface IChatItemProps {
  chat: IChat,
  lastMessage: IMessage;
  is_selected?: boolean,
  onClick?: () => void,
}