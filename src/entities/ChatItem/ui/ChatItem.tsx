import {IChatItemProps} from "../types/IChatItemProps";
import cls from "./style.module.scss";

export const ChatItem = (props: IChatItemProps) => {
  const avatarStyle = {
    backgroundColor: props.chat.avatar,
  }

  return (
    <div className={`${cls.chatItem} ${props.is_selected && cls.chatItem__selected}`}
         onClick={props.onClick}>
      <div className={cls.avatar} style={avatarStyle}/>
      <div className={cls.chatInfo}>
        <div className={cls.chatName}>
          {props.chat.name}
        </div>
        <div className={cls.chatLastMessage}>
          {props.lastMessage?.content}
        </div>
      </div>
    </div>
  );
}
