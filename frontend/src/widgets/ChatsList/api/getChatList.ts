import { BACKEND_API_URL } from '../../../shared/config/apiConfig/apiConfig';

export const getChatList = () => ({
	queryKey: ['getChatList'],
	queryFn: async ({ signal }: { signal: AbortSignal }) => {
		const url = `${BACKEND_API_URL}/chats`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
			signal,
		};

		return await (await fetch(url, options)).json();
	},
	enabled: true,
	retryDelay: 1000,
	retryCount: 5,
});

