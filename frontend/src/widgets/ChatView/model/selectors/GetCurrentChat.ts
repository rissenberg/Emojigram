import { RootState } from '../../../../app/providers/StoreProvider';

export const getCurrentChat = (state: RootState, id: string) => {
	return state.chatsReducer.chats.find(chat => chat.chat.id === id);
};
