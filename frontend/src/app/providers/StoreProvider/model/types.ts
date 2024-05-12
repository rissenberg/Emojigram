import { IChat } from '../../../../entities/Chat';
import { IUser } from '../../../../entities/User';
import { store } from '../lib/store';
import { IMessage } from '../../../../entities/Message';

export interface IChatsStorage {
  chats: Map <number, {
    chat: IChat,
    messages: IMessage[],
  }>,
}

export interface IUsersStorage {
  users: Map <number, IUser>,
}

export interface ICurrentUserStorage {
  user: IUser | null,
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
