import cls from './style.module.scss';
import { IMessage } from '../model/types/Message';

export const Message = (message: IMessage) => {
	const avatarStyle = {
		backgroundColor: message.author.avatar,
	};

	const nicknameStyle = {
		color: message.author.avatar,
	};

	// TODO делать разные стили для своего и чужого сообщения

	return (
		<div className={cls.messageItem}>
			<div className={cls.avatar} style={avatarStyle}/>

			<div className={cls.message}>

				<div className={cls.messageText} style={nicknameStyle}>
					{message.author.nickname}
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
