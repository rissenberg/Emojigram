import { configureStore } from '@reduxjs/toolkit';
import chatsReducer from './reducers/ChatsStorage';

export const store = configureStore({
	reducer: {
		chatsReducer,
	}
});
