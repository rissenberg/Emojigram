import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './slices/ChatsStorage';
import userReducer from './slices/UserStorage';

export const store = configureStore({
	reducer: {
		chatsReducer,
		userReducer
	}
});
