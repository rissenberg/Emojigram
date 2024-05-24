import cls from './style.module.scss';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from '../../../features/LoginForm';
import { SignupForm } from '../../../features/SignupForm';

export const LoginPage = () => {
	const location = useLocation();
	const selected = location.hash.replace('#', '');

	const navigate = useNavigate();
	
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			navigate('/chats');
		}
	}, []);

	const handleSelectLogin = () => {
		navigate('/login');
	};

	const handleSelectSignup = () => {
		navigate('/login#signup');
	};

	return (
		<div className={cls.page}>
			<div className={cls.auth_window}>
				<div className={cls.title}>
					Welcome to Emojigram!
				</div>

				<div className={cls.button_container}>
					<button
						className={`${cls.btn} ${selected === '' && cls.btn_active}`}
						onClick={handleSelectLogin}
					>
						Login
					</button>

					<button
						className={`${cls.btn} ${selected === 'signup' && cls.btn_active}`}
						onClick={handleSelectSignup}
					>
						Signup
					</button>
				</div>

				{ selected === 'signup'
					? <SignupForm />
					: <LoginForm />
				}
			</div>
		</div>
	);
};
