import {IChat} from "../../../../entities/Chat";
import {IUser} from "../../../../entities/User";
import {store} from "./store";

export interface ICurrentChatStorage {
  chat: IChat | null,
}

export interface IChatListStorage {
  chats: IChat[],
}

export interface ICurrentUserStorage {
  user: IUser | null,
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
