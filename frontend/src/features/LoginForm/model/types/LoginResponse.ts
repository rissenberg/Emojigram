import { IUser } from '../../../../entities/User';

export interface ILoginResponse {
	user: IUser,
	token: string,
}