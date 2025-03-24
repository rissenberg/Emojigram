import cls from './style.module.scss';
import { IMessage } from '../model/types/Message';
import { useGetUser } from '../../User';

export const Message = (message: IMessage) => {
	const [ author]  = useGetUser(message.sender_id);

	const avatarStyle = {
		backgroundColor: author?.avatar_url || '#777',
	};

	const nicknameStyle = {
		color: author?.avatar_url || '#777',
	};

	// TODO делать разные стили для своего и чужого сообщения

	return (
		<div className={cls.messageItem}>
			<div className={cls.avatar} style={avatarStyle}/>

			<div className={cls.message}>

				<div className={cls.messageText} style={nicknameStyle}>
					{message.sender_id}
				</div>

				<div className={cls.messageText}>
					{message.content}
					<span className={cls.messageDate}>
						{message.send_date}
					</span>
				</div>

			</div>
		</div>
	);
};
