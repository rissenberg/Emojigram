export interface IUser {
  id: number,
  avatar: string,
  nickname: string,
  email: string,
  last_online: Date, // TODO решить, как отображать онлайн
  deleted: boolean
}