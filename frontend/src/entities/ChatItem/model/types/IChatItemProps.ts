import { IChat } from '../../../Chat';
import { IMessage } from '../../../Message';

export interface IChatItemProps {
  chat: IChat,
  lastMessage: IMessage | null; // TODO не забыть изменить
  is_selected?: boolean,
  onClick?: () => void,
}