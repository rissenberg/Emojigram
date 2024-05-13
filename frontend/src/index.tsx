import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { StoreProvider } from './app/providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './app/providers/QueryProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<StoreProvider>
			<BrowserRouter>
				<QueryProvider>
					<App />
				</QueryProvider>
			</BrowserRouter>
		</StoreProvider>
	</React.StrictMode>
);