import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/providers/StoreProvider';
import { IUser } from '../index';
import { getCurrentUser } from '../../../features/Authorization/model/selectors/getCurrentUser';
import { clearCurrentUser, newCurrentUser } from '../../../app/providers/StoreProvider';


export const useCurrentUser = () => {
	const currentUser = useSelector((state: RootState) => getCurrentUser(state));
	const dispatch = useDispatch<AppDispatch>();

	const setCurrentUser = (user: IUser | null) => {
		if (user) {
			dispatch(newCurrentUser(user));
			return;
		}

		dispatch(clearCurrentUser());
	};

	return { currentUser, setCurrentUser };
};
