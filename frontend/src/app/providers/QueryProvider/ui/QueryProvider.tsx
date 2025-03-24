import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface IProps {
  children: React.ReactNode,
}

const queryClient = new QueryClient();

export const QueryProvider = (props: IProps) => {
	const { children } = props;

	return (
		<QueryClientProvider client={queryClient}>
			{ children }
		</QueryClientProvider>
	);
};
