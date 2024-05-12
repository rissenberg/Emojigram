import { createSlice } from '@reduxjs/toolkit';
import { IUsersStorage } from '../../model/types';

const initialState: IUsersStorage = {
	users: new Map(),
};

const usersSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		updateUser: (state, action) => {
			state.users.set(action.payload.id, action.payload);
		},
	},
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;
