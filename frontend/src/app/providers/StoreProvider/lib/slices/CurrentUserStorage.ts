import { createSlice } from '@reduxjs/toolkit';
import { ICurrentUserStorage } from '../../model/types';

// TODO delete mock data
const initialState: ICurrentUserStorage = {
	user: {
		id: 1,
		avatar: '#dd6b41',
		username: 'Yanka',
		email: 'yanka@mail.ru',
	},
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.user = action.payload;
		},
		clearCurrentUser: (state) => {
			state.user = null;
		},
	},
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
