import { RootState } from '../../../../app/providers/StoreProvider';

export const getChatsList = (state: RootState) => {
	const chatsArr = Array.from(state.chatsReducer.chats,
		([id, value]) => value);

	return chatsArr.map(chatItem => ({
		chat: chatItem.chat,
		lastMessage: chatItem.messages[0],
	}));
};
