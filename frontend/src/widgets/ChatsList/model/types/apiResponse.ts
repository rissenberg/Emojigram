import { IMessage } from '../../../../entities/Message';

export interface IGetChatListResponse {
	chats: {
		id: number,
		name?: string,
		avatar?: string,
		type: 'group' | 'dialog',
		last_message: IMessage | null,
	}[]
}
