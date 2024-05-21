import { createSlice } from '@reduxjs/toolkit';
import { IChatsStorage } from '../../model/types';

const initialState: IChatsStorage = {
	chats: [],
};

const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		pushChat: (state, action) => {
			const index = state.chats.findIndex(item => item.chat.id === action.payload.chat.id);

			if (index === -1)
				state.chats.push(action.payload);
		},
		updateChat: (state, action) => {
			const index = state.chats.findIndex(item => item.chat.id === action.payload?.chat.id);

			if (index !== -1)
				state.chats[index] = action.payload;
		},
	}
});

export const { pushChat, updateChat } = chatsSlice.actions;

export default chatsSlice.reducer;
