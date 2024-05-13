import { IMessageResponse } from './Messages';
import { IChatUserList } from './Users';

export interface IChatsListResponse {
	chats: {
		id: number,
		name?: string,
		avatar?: string,
		type: 'group' | 'dialog',
		last_message: IMessageResponse | null,
	} []
}

export interface IChatResponse {
	chat: {
		id: number,
		name?: string,
		avatar?: string,
		type: 'group' | 'dialog',
		users: IChatUserList[],
	},
	messages: IMessageResponse[],
}

export interface ICreateChatRequest {
	name: string,
	avatar?: string,
	type: 'group' | 'dialog',
}

export const ChatRequestSchema = {
	'type': 'object',
	'properties': {
		'name': {
			'type': 'string',
			'default': 'New Chat'
		},
		'avatar': {
			'type': 'string',
			'default': '#4b98e4'
		},
		'type': {
			'type': 'string',
			'default': 'group || dialog',
		}
	}
};
