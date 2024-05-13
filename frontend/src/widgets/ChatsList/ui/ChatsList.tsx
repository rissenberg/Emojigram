import cls from './style.module.scss';
import { ChatItem } from '../../../entities/ChatItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getChatsList } from '../model/selectors/GetChatsList';
import { useQuery } from '@tanstack/react-query';
import { getChatList } from '../api/getChatList';
import { AppDispatch } from '../../../app/providers/StoreProvider';
import { IGetChatListResponse } from '../model/types/apiResponse';
import { pushChat } from '../../../app/providers/StoreProvider/lib/slices/ChatsStorage';

export const ChatsList = () => {
	const location = useLocation();
	const idSelected = parseInt(location.hash.replace('#', ''));

	const [selectedChat, setSelectedChat] = useState<number | null>(idSelected);
	const chatsList = useSelector(getChatsList);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const {
		data,
		error,
		isFetching,
	} = useQuery<IGetChatListResponse>(getChatList());

	useEffect(() => {
		setSelectedChat(idSelected);
	}, [idSelected]);

	useEffect(() => {
		data?.chats.forEach(chatItem => {
			dispatch(pushChat({
				chat: chatItem,
				messages: chatItem.last_message ? [chatItem.last_message] : []
			}));
		});
	}, [data]);

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

	const ListContent = isFetching ? 'Loading...' :
		error ? error.message :
			chatsList.map(chatItem =>
				<ChatItem
					{...chatItem}
					is_selected = {selectedChat === chatItem.chat.id}
					onClick={() => setSelectedChat(chatItem.chat.id) }
					key={chatItem.chat.id}
				/>
			);

	return (
		<div className={cls.chatsList}>
			<div className={cls.searchBar}>
				<input className={cls.searchInput} />
			</div>

			<div className={cls.chatsContainer}>
				{ ListContent }
			</div>
		</div>
	);
};
