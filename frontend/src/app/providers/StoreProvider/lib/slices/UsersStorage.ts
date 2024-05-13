import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet, produce } from 'immer';
import { IUsersStorage } from '../../model/types';

enableMapSet();

const initialState: IUsersStorage = {
	users: new Map(),
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		updateUser: (state, action) => {
			return produce(state, (draft) => {
				draft.users.set(action.payload.id, action.payload);
			});
		},
	},
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;
