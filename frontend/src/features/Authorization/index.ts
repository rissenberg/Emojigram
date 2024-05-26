import { authLogin } from './api/login';
import { authSignup } from './api/signup';
import { useCheckAuth } from './hooks/useCheckAuth';

import { IAuthResponse } from './model/types/AuthResponse';

export {
	authLogin,
	authSignup,
	useCheckAuth,
};

export type {
	IAuthResponse
};
