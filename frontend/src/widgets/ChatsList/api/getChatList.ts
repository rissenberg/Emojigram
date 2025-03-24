import { BACKEND_API_URL } from '../../../shared/config/apiConfig/apiConfig';

export const getChatList = () => ({
	url: `${BACKEND_API_URL}/chats`,
	options: {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
	},
	enabled: true,
	retryDelay: 1000,
	retryCount: 5,
});

