import { BACKEND_API_URL } from '../../../shared/config/apiConfig/apiConfig';

export const getUserByID = (userID: number | undefined) => ({
	queryKey: [`getUser${userID}`],
	queryFn: async ({ signal }: { signal: AbortSignal }) => {
		if (!userID)
			return {};

		const url = `${BACKEND_API_URL}/users/${userID}`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
			signal,
		};

		return await (await fetch(url, options)).json();
	},
	enabled: false,
	retryDelay: 1000,
	retryCount: 5,
});

