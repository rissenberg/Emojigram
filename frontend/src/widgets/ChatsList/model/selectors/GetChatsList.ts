import { RootState } from '../../../../app/providers/StoreProvider';

export const getChatsList = (state: RootState) => {
	return state.chatsReducer.chats.map(chatItem => ({
		chat: chatItem.chat,
		lastMessage: chatItem.messages[0],
	}));
};
