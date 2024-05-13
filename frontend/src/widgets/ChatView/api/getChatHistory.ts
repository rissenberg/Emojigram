import { BACKEND_API_URL } from '../../../shared/config/apiConfig/apiConfig';

export const getChatHistory = (chatID: number) => ({
	queryKey: [`getChatHistory${chatID}`],
	queryFn: async ({ signal }: { signal: AbortSignal }) => {
		if (chatID !== chatID)
			return {};

		const url = `${BACKEND_API_URL}/chats/${chatID}`;
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

