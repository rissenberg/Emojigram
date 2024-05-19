import { IMessageResponse } from './Messages';
import { IChatUsersList } from './Users';

export interface IChatsListItem {
	id: string,
	name: string,
	avatar_url?: string,
	last_message: {
		sender_id: string,
		sent_at: Date,
		content: string,
	} | null
}

export interface IChatsListResponse {
	chats: IChatsListItem[]
}

export interface IChatResponse {
	chat: {
		id: string,
		name: string,
		created: Date,
		avatar_url?: string,
		users: IChatUsersList[]
	},
	messages: IMessageResponse[],
}

export interface ICreateChatRequest {
	name: string,
	avatar?: string
}