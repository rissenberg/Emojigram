import { useDispatch, useSelector } from 'react-redux';
import { getUserFromStorage } from '../model/selectors/GetUser';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppDispatch } from '../../../app/providers/StoreProvider';
import { updateUser } from '../../../app/providers/StoreProvider/lib/slices/UsersStorage';
import { IGetUserByID } from '../model/types/apiResponse';
import { getUserByID } from '../api/getUserByID';


export const useGetUser = (userID: number | undefined) => {
	const user = useSelector(getUserFromStorage(userID));
	const dispatch = useDispatch<AppDispatch>();

	const {
		data,
		error,
		refetch,
		isFetching
	} = useQuery<IGetUserByID>(getUserByID(userID));

	useEffect(() => {
		if (!user && !isFetching)
			refetch();

	}, []);

	useEffect(() => {
		if (!user && !error && data && data.user)
			dispatch(updateUser(data.user));

	}, [data]);

	if (user && !error)
		return [user];

	return [undefined];
};
