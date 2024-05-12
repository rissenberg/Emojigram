import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './slices/ChatsStorage';
import currentUserReducer from './slices/CurrentUserStorage';
import usersReducer from './slices/UsersStorage';

export const store = configureStore({
	reducer: {
		chatsReducer,
		currentUserReducer,
		usersReducer
	}
});
