import { IMessageResponse } from './Messages';

export interface IChatsListResponse {
	chats: {
		id: number,
		name: string,
		avatar_url?: string,
		last_message: {
			sender_id: string,
			sent_at: Date,
			content: string,
		} | null
	}[]
}

export interface IChatResponse {
	chat: {
		id: number,
		name: string,
		created: Date,
		avatar_url?: string,
		users: {
			id: string,
			avatar_url?: string,
			role: 'default' | 'admin',
			joined_at: Date,
			removed: boolean
		}[]
	},
	messages: IMessageResponse[],
}

export interface IChatCreateResponse {
	chat: {
		id: number,
		name: string,
		created: Date,
		avatar_url?: string,
	},
}

export interface ICreateChatRequest {
	name: string,
	avatar_url?: string
}