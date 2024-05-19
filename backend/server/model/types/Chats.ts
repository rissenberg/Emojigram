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

// Response Body

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

// Request Body

export interface ICreateChatRequest {
	name: string,
	avatar?: string
}

export interface IAddUserToChatRequest {
	username: string
}