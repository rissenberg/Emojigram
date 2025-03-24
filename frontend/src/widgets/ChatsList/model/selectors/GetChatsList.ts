import { RootState } from '../../../../app/providers/StoreProvider';

export const getChatsList = (state: RootState) => {
	return state.chatsReducer.chats.map(item => ({
		chat: item.chat,
		lastMessage: item.messages[0],
	}));
};
