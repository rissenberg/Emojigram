import { BACKEND_API_URL } from '../../../shared/config/apiConfig/apiConfig';
import { ICredentials } from '../model/types/Credentials';

export const authLogin = (credentials: ICredentials) => ({
	url: `${BACKEND_API_URL}/auth/login`,
	options: {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	},
	enabled: false,
	retryDelay: 1000,
	retryCount: 5,
});

