import cls from "./style.module.scss";
import MoreIcon from "../../../shared/icons/more.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/providers/StoreProvider/lib/types";
import {SendMessageBar} from "../../../features/SendMessageBar";
import {useLocation} from "react-router-dom";

export const ChatView = () => {
  const location = useLocation();
  const id = parseInt(location.hash.replace('#', ''));
  const currentChat = useSelector((state: RootState) => {
    return state.chatsReducer.chats.find(item => item.chat.id === id);
  });

  return (
    <div className={cls.chatView}>
      {!currentChat &&
          <div className={cls.emptyMessage}>
              Choose a chat to start
          </div>
      }
      {currentChat &&
          <>
              <div className={cls.chatView_header}>
                  <div className={cls.header_chatName}>
                    {currentChat.chat.name}
                  </div>
                  <div className={cls.header_buttonContainer}>
                      <img src={MoreIcon} alt="more"/>
                  </div>
              </div>

              <div className={cls.messagesContainer}>

              </div>

              <SendMessageBar />
          </>
      }
    </div>
  )
}
