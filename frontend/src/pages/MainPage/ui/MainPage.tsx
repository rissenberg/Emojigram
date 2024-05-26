import { ChatsList } from '../../../widgets/ChatsList';
import cls from './style.module.scss';
import { ChatView } from '../../../widgets/ChatView';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../../entities/User';

export const MainPage = () => {
	const { currentUser } = useCurrentUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate('/login');
		}
	}, [currentUser]);

	return (
		<div className={cls.page}>
			<ChatsList />
			<ChatView />
		</div>
	);
};
