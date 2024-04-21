import { configureStore } from '@reduxjs/toolkit';
import currentChatReducer from './reducers/currentChatStorage';

export const store = configureStore({
  reducer: {
    currentChatReducer,
  }
});
