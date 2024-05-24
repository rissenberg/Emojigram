import { useState, useEffect } from 'react';

export interface IUseFetchProps {
	url: string,
	options: {
		method: string,
		headers: {
			[key: string]: string
		},
		body?: string,
	},
	enabled?: boolean,
	retryCount?: number,
}

export const useFetch = <T>(props: IUseFetchProps) => {
	const { url, options, enabled = true, retryCount = 3 } = props;

	options.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

	const [data, setData] = useState<T | null>(null);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const refetch = async () => {
		setIsFetching(true);
		setError(null);

		for (let it = 0; it < retryCount; it++) {
			try {
				const response = await fetch(url, options);

				const data = await response.json();

				setIsFetching(false);

				if (!response.ok)
					setError(data.error);
				else
					setData(data);

				return;
			} catch (err: unknown) {
				setIsFetching(false);
				setError(String(err));
			}
		}
	};

	useEffect(() => {
		if (enabled) {
			refetch();
		}
	}, []);

	return { data, isFetching, error, refetch };
};