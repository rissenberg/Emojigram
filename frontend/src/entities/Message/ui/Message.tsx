import cls from './style.module.scss';
import { IMessage } from '../model/types/Message';
import { useGetUser } from '../../User';

export const Message = (message: IMessage) => {
	const [ author]  = useGetUser(message.author_id);

	const avatarStyle = {
		backgroundColor: author ? author.avatar : '#777',
	};

	const nicknameStyle = {
		color: author ? author.avatar : '#777',
	};

	// TODO делать разные стили для своего и чужого сообщения

	return (
		<div className={cls.messageItem}>
			<div className={cls.avatar} style={avatarStyle}/>

			<div className={cls.message}>

				<div className={cls.messageText} style={nicknameStyle}>
					{author && author.username}
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
