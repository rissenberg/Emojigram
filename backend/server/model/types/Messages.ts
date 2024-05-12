import { IUserResponse } from './Users';

export interface IMessageResponse {
	id: number,
	author: IUserResponse | null,
	content: string,
	sent_at: Date,
}