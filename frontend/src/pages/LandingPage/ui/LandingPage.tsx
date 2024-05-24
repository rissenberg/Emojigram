import cls from './style.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
	const navigate = useNavigate();
	
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			navigate('/chats');
		}
	}, []);

	return (
		<div className={cls.page}>

		</div>
	);
};
