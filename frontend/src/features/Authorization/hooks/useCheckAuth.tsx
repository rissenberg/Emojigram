import { useFetch } from '../../../shared/hooks/useFetch';
import { refreshToken } from '../api/refreshToken';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '../../../entities/User';
import { IAuthResponse } from '../model/types/AuthResponse';


export const useCheckAuth = () => {
	const { setCurrentUser } = useCurrentUser();
	const [ isDone, setIsDone ] = useState<boolean>(false);
	const [ isAuth, setIsAuth ] = useState<boolean>(false);
	const {
		data,
		error,
		refetch,
		isFetching
	} = useFetch<IAuthResponse>(refreshToken());


	useEffect(() => {
		if (!isFetching)
			setIsDone(true);

		if (data && !error) {
			setCurrentUser(data.user);
			localStorage.setItem('token', data.token);

			setIsAuth(true);
			return;
		}
		setCurrentUser(null);
		localStorage.removeItem('token');

		setIsAuth(false);
	}, [data, error]);

	const checkAuth = () => {
		setIsDone(false);
		refetch();
	};

	return { checkAuth, isAuth, isDone };
};
