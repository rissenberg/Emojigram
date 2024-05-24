import { ChatsList } from '../../../widgets/ChatsList';
import cls from './style.module.scss';
import { ChatView } from '../../../widgets/ChatView';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
	const navigate = useNavigate();
	
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			navigate('/login');
		}
	}, []);

	return (
		<div className={cls.page}>
			<ChatsList />
			<ChatView />
		</div>
	);
};
