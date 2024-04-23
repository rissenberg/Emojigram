import cls from './style.module.scss';
import MoreIcon from '../../../shared/assets/icons/more.svg';
import { useSelector } from 'react-redux';
import { SendMessageBar } from '../../../features/SendMessageBar';
import { useLocation } from 'react-router-dom';
import { getCurrentChat } from '../model/selectors/GetCurrentChat';
import { RootState } from '../../../app/providers/StoreProvider';

export const ChatView = () => {
	const location = useLocation();
	const id = parseInt(location.hash.replace('#', ''));

	const currentChat = useSelector((state: RootState) => getCurrentChat(state, id));

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

					<SendMessageBar/>
				</>
			}
		</div>
	);
};
