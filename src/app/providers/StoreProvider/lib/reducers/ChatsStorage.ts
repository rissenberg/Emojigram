import {createSlice} from "@reduxjs/toolkit";
import {IChatsStorage} from "../types";

// MockData
const initialState: IChatsStorage = {
  chats: [
    {
      chat: {
        id: 1,
        avatar: '#4b8bc0',
        name: 'Chat No. 1',
        users: [],
      },
      messages: [],
    },
    {
      chat: {
        id: 2,
        avatar: '#ddac52',
        name: 'Chat No. 2',
        users: [],
      },
      messages: [],
    },
    {
      chat: {
        id: 3,
        avatar: '#5bc04b',
        name: 'Chat No. 3',
        users: [],
      },
      messages: [],
    },
  ],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
  },
});

export const { addChat } = chatsSlice.actions;

export default chatsSlice.reducer;
