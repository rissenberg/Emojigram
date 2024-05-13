import { IUser } from '../../../User';

export interface IMessage {
  id: number,
  author: IUser,
  content: string,
  send_date: string,
}
