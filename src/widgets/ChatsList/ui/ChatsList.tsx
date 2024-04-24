import cls from './style.module.scss';
import { ChatItem } from '../../../entities/ChatItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getChatsList } from '../model/selectors/GetChatsList';

export const ChatsList = () => {
	const location = useLocation();
	const idSelected = parseInt(location.hash.replace('#', ''));
	const [selectedChat, setSelectedChat] = useState<number | null>(idSelected);
	const chatsList = useSelector(getChatsList);
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
						is_selected = {selectedChat === chatItem.chat.id}
						onClick={() => setSelectedChat(chatItem.chat.id) }
						key={chatItem.chat.id}
					/>
				)}
			</div>
		</div>
	);
};
