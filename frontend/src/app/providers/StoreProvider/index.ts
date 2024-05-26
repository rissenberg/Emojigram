import { StoreProvider } from './ui/StoreProvider';

import { clearCurrentUser, newCurrentUser } from './lib/slices/CurrentUserStorage';

import { RootState, AppDispatch } from './model/types';

export {
	StoreProvider,

	clearCurrentUser,
	newCurrentUser,
};

export type {
	RootState,
	AppDispatch
};

