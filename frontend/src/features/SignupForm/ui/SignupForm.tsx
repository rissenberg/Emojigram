import cls from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { authSignup } from '../api/signup';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../shared/hooks/useFetch';
import { ILoginResponse } from '../../LoginForm';


export const SignupForm = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repPassword, setRepPassword] = useState('');
	const navigate = useNavigate();

	const {
		data,
		error,
		refetch,
	} = useFetch<ILoginResponse>(authSignup({ username, email, password }));

	useEffect(() => {
		if (data && data.token) {
			localStorage.setItem('token', data.token);
			navigate('/chats');
		}
	}, [data]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (password !== repPassword)
			return;
		refetch();
	};

	const handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleRepPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRepPassword(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className={cls.form}>
			<div className={cls.error_message}>
				{error && error}
				{password !== repPassword && 'Passwords are not equal'}
			</div>

			<div className={cls.input_container}>
				<input
					className={cls.input}
					type="text"
					id="username"
					value={username}
					placeholder={'Username'}
					onChange={handleUsernameInput}
				/>

				<input
					className={cls.input}
					type="email"
					id="email"
					value={email}
					placeholder={'Email'}
					onChange={handleEmailInput}
				/>

				<input
					className={cls.input}
					type="password"
					id="password"
					value={password}
					placeholder={'Password'}
					onChange={handlePasswordInput}
				/>

				<input
					className={cls.input}
					type="password"
					id="rep-password"
					value={repPassword}
					placeholder={'Repeat password'}
					onChange={handleRepPasswordInput}
				/>
			</div>

			<button type="submit" className={cls.btn}> Signup</button>
		</form>
	);
};
