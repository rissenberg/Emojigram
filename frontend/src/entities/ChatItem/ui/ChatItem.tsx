import { IChatItemProps } from '../model/types/IChatItemProps';
import { Link } from 'react-router-dom';
import cls from './style.module.scss';
import { useGetUser } from '../../User';

export const ChatItem = (props: IChatItemProps) => {
	const {
		chat,
		lastMessage,
		is_selected,
		onClick,
	} = props;

	const [ author]  = useGetUser(lastMessage?.author_id);

	const avatarStyle = {
		backgroundColor: chat.avatar,
	};

	return (
		<Link to={`/chats#${chat.id}`} className={`${cls.chatItem} ${is_selected && cls.chatItem__selected}`}
			onClick={onClick}>

			<div className={cls.avatar} style={avatarStyle}/>

			<div className={cls.chatInfo}>
				<div className={cls.chatName}>
					{chat.name}
				</div>

				<div className={cls.lastMessage}>
					{lastMessage &&
						<>
							{author && author.username}: <span className={cls.lastMessage_text}>{lastMessage.content}</span>
						</>
					}
				</div>

			</div>
		</Link>
	);
};
