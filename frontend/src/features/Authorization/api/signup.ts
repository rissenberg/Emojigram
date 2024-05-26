import { BACKEND_API_URL } from '../../../shared/config/apiConfig/apiConfig';
import { ICredentials } from '../../SignupForm/model/types/Credentials';

export const authSignup = (credentials: ICredentials) => ({
	url: `${BACKEND_API_URL}/auth/signup`,
	options: {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	},
	enabled: false,
});
