import cls from "./style.module.scss"
import {ChatItem} from "../../../entities/ChatItem";
import {IChatItemProps} from "../../../entities/ChatItem/types/IChatItemProps";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {clearCurrentChat, setCurrentChat} from "../../../app/providers/StoreProvider/lib/reducers/currentChatStorage";

export const ChatsList = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(clearCurrentChat());
        setSelectedChat(null);
      }
    };
    window.addEventListener('keydown', handleEscapeKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, []);

  // Mock Data
  const chats: IChatItemProps[] = [
    {
      chat: {
        id: 1,
        avatar: '#4b8bc0',
        name: 'Chat No. 1',
        users: [],
      },
      lastMessage: null,
    },
    {
      chat: {
        id: 2,
        avatar: '#ddac52',
        name: 'Chat No. 2',
        users: [],
      },
      lastMessage: null,
    },
    {
      chat: {
        id: 3,
        avatar: '#5bc04b',
        name: 'Chat No. 3',
        users: [],
      },
      lastMessage: null,
    },
  ];

  return (
    <div className={cls.chatsList}>
      <div className={cls.searchBar}>
        <input className={cls.searchInput} />
      </div>

      <div className={cls.chatsContainer}>
        {chats.map(chatItem =>
          <ChatItem
              {...chatItem}
              is_selected = {selectedChat === chatItem.chat.id}
              onClick={() => {
                dispatch(setCurrentChat(chatItem.chat));
                setSelectedChat(chatItem.chat.id);
              }}
          />
        )}
      </div>
    </div>
  )
}
