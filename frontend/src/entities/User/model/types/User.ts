export interface IUser {
  id: number,
  avatar: string,
  username: string,
  email: string,
  last_online?: Date, // TODO решить, как отображать онлайн
  deleted?: boolean
}