import cls from "./style.module.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/providers/StoreProvider/lib/types";

export const ChatView = () => {
  const currentChat = useSelector((state: RootState) => state.currentChatReducer.chat);

  return (
    <div className={cls.chatView}>
      <div className={cls.emptyMessage}>
        {currentChat ? currentChat.name : 'Choose a chat to start'}
      </div>
    </div>
  )
}