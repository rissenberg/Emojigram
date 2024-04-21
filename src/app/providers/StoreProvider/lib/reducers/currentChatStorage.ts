import {createSlice} from "@reduxjs/toolkit";
import {ICurrentChatStorage} from "../types";

const initialState: ICurrentChatStorage = {
  chat: null,
};

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.chat = action.payload;
    },
    clearCurrentChat: (state) => {
      state.chat = null;
    }
  },
});

export const { setCurrentChat, clearCurrentChat } = currentChatSlice.actions;

export default currentChatSlice.reducer;
