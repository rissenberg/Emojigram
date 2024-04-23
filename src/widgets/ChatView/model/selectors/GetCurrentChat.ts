import { RootState } from '../../../../app/providers/StoreProvider/model/types';

export const getCurrentChat = (state: RootState, id: number) => {
	return state.chatsReducer.chats.find(item => item.chat.id === id);
};
