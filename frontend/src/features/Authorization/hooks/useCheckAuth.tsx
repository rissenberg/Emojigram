import { useFetch } from '../../../shared/hooks/useFetch';
import { refreshToken } from '../api/refreshToken';
import { useEffect } from 'react';
import { useCurrentUser } from '../../../entities/User/hooks/useCurrentUser';
import { IAuthResponse } from '../model/types/AuthResponse';
import { useNavigate } from 'react-router-dom';


export const useCheckAuth = () => {
	const { setCurrentUser } = useCurrentUser();
	const navigate = useNavigate();
	const {
		data,
		error,
		refetch
	} = useFetch<IAuthResponse>(refreshToken());

	useEffect(() => {
		if (data && !error) {
			setCurrentUser(data.user);
			localStorage.setItem('token', data.token);

			navigate('/chats');
			return;
		}

		setCurrentUser(null);
		localStorage.setItem('token', '');

		navigate('/login');
	}, [data, error]);

	return () => {
		refetch();
	};
};
