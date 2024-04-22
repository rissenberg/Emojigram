import {IChat} from "../../../../entities/Chat";
import {IUser} from "../../../../entities/User";
import {store} from "./store";
import {IMessage} from "../../../../entities/Message";

export interface IChatsStorage {
  chats: {
    chat: IChat,
    messages: IMessage[],
  }[],
}

export interface ICurrentUserStorage {
  user: IUser | null,
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
