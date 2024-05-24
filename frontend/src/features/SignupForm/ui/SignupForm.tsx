import cls from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { ILoginResponse } from '../model/types/LoginResponse';
import { authLogin } from '../api/login';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../shared/hooks/useFetch';


export const LoginForm = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const {
		data,
		error,
		refetch,
	} = useFetch<ILoginResponse>(authLogin({ login, password }));

	useEffect(() => {
		if (data && data.token) {
			localStorage.setItem('token', data.token);
			navigate('/chats');
		}
	}, [data]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		refetch();
	};

	const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value);
	};

	const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<div className={cls.error_message}>
				{error && error}
			</div>

			<div className={cls.input_container} >
				<input
					className={cls.input}
					type="text"
					id="username"
					value={login}
					placeholder={'Username or Email'}
					onChange={handleLoginInput}
				/>

				<input
					className={cls.input}
					type="password"
					id="password"
					value={password}
					placeholder={'Password'}
					onChange={handlePasswordInput}
				/>
			</div>

			<button type="submit" className={cls.btn}> Login </button>
		</form>
	);
};
