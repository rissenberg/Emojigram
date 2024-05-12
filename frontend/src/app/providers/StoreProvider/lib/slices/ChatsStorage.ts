import { createSlice } from '@reduxjs/toolkit';
import { IChatsStorage } from '../../model/types';

const initialState: IChatsStorage = {
	chats: new Map(),
};

const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		addChat: (state, action) => {
			if (state.chats.has(action.payload.id))
				return;
			state.chats.set(action.payload.chat.id, action.payload);
		},
		updateChat: (state, action) => {
			state.chats.set(action.payload.chat.id, action.payload);
		},
	},
});

export const { addChat, updateChat } = chatsSlice.actions;

export default chatsSlice.reducer;
