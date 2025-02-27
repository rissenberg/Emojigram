import { BACKEND_API_URL } from '../../../shared/config/apiConfig/apiConfig';

export const refreshToken = () => ({
	url: `${BACKEND_API_URL}/auth/refresh`,
	options: {
		method: 'POST',
		headers: {
			accept: 'application/json',
		},
	},
	enabled: false
});

