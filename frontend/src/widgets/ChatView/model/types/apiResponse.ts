import { IMessage } from '../../../../entities/Message';

export interface IGetChatHistoryResponse {
	chat: {
		id: number,
		name?: string,
		avatar?: string,
		type: 'group' | 'dialog',
	},
	messages: IMessage[]
}
