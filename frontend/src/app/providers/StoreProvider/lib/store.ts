import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './slices/ChatsStorage';

export const store = configureStore({
	reducer: {
		chatsReducer,
	}
});
