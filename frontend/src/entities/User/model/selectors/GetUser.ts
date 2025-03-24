import { RootState } from '../../../../app/providers/StoreProvider';

export const getUserFromStorage = (userID: number | undefined) => {
	return (state: RootState) => {
		if (!userID)
			return undefined;

		return state.usersReducer.users.get(userID);
	};
};

