import { swChatsRoute } from '../api/api_chats';
import { SERVER_PORT } from '../config/config';
import { swUsersRoute } from '../api/api_users';

const swagger = {
	openapi: '3.0.0',
	info: {
		title: 'Express API for Emojigram',
		version: '1.2.0',
		description: 'The REST API for Emojigram Messenger service'
	},
	servers: [
		{
			url: `http://localhost:${SERVER_PORT}`,
			description: 'Development server'
		}
	],
	paths: {
		...swChatsRoute,
		...swUsersRoute
	},
};

export default swagger;