import { createSlice } from '@reduxjs/toolkit';
import { IChatsStorage } from '../../model/types';

const initialState: IChatsStorage = {
	chats: [],
};

const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		addChat: (state, action) => {
			state.chats.push(action.payload);
		},
	},
});

export const { addChat } = chatsSlice.actions;

export default chatsSlice.reducer;
