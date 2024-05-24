import cls from './style.module.scss';
import MoreIcon from '../../../shared/assets/icons/more.svg';
import { useDispatch, useSelector } from 'react-redux';
import { SendMessageBar } from '../../../features/SendMessageBar';
import { useLocation } from 'react-router-dom';
import { getCurrentChat } from '../model/selectors/GetCurrentChat';
import { AppDispatch, RootState } from '../../../app/providers/StoreProvider';
import { Message } from '../../../entities/Message';
import { useEffect } from 'react';
import { updateChat } from '../../../app/providers/StoreProvider/lib/slices/ChatsStorage';
import { IGetChatHistoryResponse } from '../model/types/apiResponse';
import { getChatHistory } from '../api/getChatHistory';
import { useFetch } from '../../../shared/hooks/useFetch';

export const ChatView = () => {
	const location = useLocation();
	const id = parseInt(location.hash.replace('#', ''));

	const currentChat = useSelector((state: RootState) => getCurrentChat(state, id));
	const dispatch = useDispatch<AppDispatch>();

	const {
		data,
		error,
	} = useFetch<IGetChatHistoryResponse>(getChatHistory(id));

	useEffect(() => {
		if (!error)
			dispatch(updateChat(data));
	}, [data]);

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
							{currentChat.chat.type === 'group' && currentChat.chat.name}
						</div>
						<div className={cls.header_buttonContainer}>
							<img src={MoreIcon} alt="more"/>
						</div>
					</div>

					<div className={cls.messagesContainer}>
						{currentChat.messages.length === 0 &&
							<div className={cls.emptyMessage}>
									No messages here yet!
							</div>
						}
						{currentChat.messages.map((message) => (
							<Message {...message} key={message.id}/>
						))}
					</div>

					<SendMessageBar/>
				</>
			}
		</div>
	);
};
