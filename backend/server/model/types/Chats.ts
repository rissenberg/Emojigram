import {IMessageResponse} from "./Messages";
import {IUserResponse} from "./Users";

export interface IChatsListResponse {
	chats: {
		id: number,
		name?: string,
		avatar?: string,
		type: 'group' | 'dialog',
		last_message: IMessageResponse | null,
	}[]
}

export interface IChatResponse {
	chat: {
		id: number,
		name?: string,
		avatar?: string,
		type: 'group' | 'dialog',
		users: Array<IUserResponse | null>,
	},
	messages: IMessageResponse[],
}

export interface ICreateChatRequest {
	name: string,
	avatar?: string,
	type: 'group' | 'dialog',
}