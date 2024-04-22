import cls from "./style.module.scss"
import {ChatItem} from "../../../entities/ChatItem";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/providers/StoreProvider/lib/types";
import {useLocation, useNavigate} from 'react-router-dom';

export const ChatsList = () => {
  const location = useLocation();
  const idSelected = parseInt(location.hash.replace('#', ''));
  const [selectedChat, setSelectedChat] = useState<number | null>(idSelected);
  const chatsList = useSelector((state: RootState) => state.chatsReducer.chats);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedChat(idSelected);
  }, [idSelected]);

  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate('/chats');
        setSelectedChat(null);
      }
    };
    window.addEventListener('keydown', handleEscapeKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, []);

  return (
    <div className={cls.chatsList}>
      <div className={cls.searchBar}>
        <input className={cls.searchInput} />
      </div>

      <div className={cls.chatsContainer}>
        {chatsList.map(chatItem =>
          <ChatItem
              {...chatItem}
              lastMessage={chatItem.messages[0]}
              is_selected = {selectedChat === chatItem.chat.id}
              onClick={() => {
                navigate(`/chats#${chatItem.chat.id}`);
                setSelectedChat(chatItem.chat.id);
              }}
              key={chatItem.chat.id}
          />
        )}
      </div>
    </div>
  )
}
