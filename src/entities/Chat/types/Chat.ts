import {IUser} from "../../User";

export interface IChat {
  id: number,
  avatar: string,
  name: string,
  users: IUser[],
  admin_id?: number,
  created?: Date,
}