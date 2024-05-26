import { IUser } from '../../../../entities/User';

export interface IAuthResponse {
	user: IUser,
	token: string,
}