import { Request, Response } from 'express';
import { ChatsService } from '../services/service_chats';
import { createChatValidator } from '../model/validators/ChatValidators';
import { API_PATH_PREFIX } from '../config/config';
import { ChatRequestSchema } from '../model/types/Chats';

// TODO delete MOCK
const userID = 1;

export class ChatsAPI {
	ChatsService: ChatsService;

	constructor() {
		this.ChatsService = new ChatsService();
	}

	getUsersChatsList = (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const response = this.ChatsService.getUsersChatsList(userID);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	getChatByID = (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const chatID = parseInt(req.params.id);
		const response = this.ChatsService.getChatByID(chatID, userID);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	createChat = (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const chat = req.body;
		if (!createChatValidator(chat))
			return res.status(400).json({
				error: 'Invalid request body',
			});

		const response = this.ChatsService.createChat(chat, userID);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};
}


export const swChatsRoute = {
	[`${API_PATH_PREFIX}/chats`]: {
		'get': {
			'summary': 'Get users chat list',
			'tags': [
				'Chats'
			],
			'responses': {
				'200': {
					'description': 'Success'
				},
				'500': {
					'description': 'Internal Error'
				}
			}
		},


		'post': {
			'summary': 'Create new chat',
			'tags': [
				'Chats'
			],
			'requestBody': {
				'content': {
					'application/json': {
						'schema': {
							...ChatRequestSchema
						}
					}
				}
			},
			'responses': {
				'200': {
					'description': 'Success'
				},
				'400': {
					'description': 'Invalid request body'
				},
				'500': {
					'description': 'Internal Error'
				}
			}
		},
	},


	[`${API_PATH_PREFIX}/chats/{id}`]: {
		'get': {
			'summary': 'Get chat history by id',
			'tags': [
				'Chats'
			],
			parameters: [
				{
					'name': 'id',
					'in': 'path',
					'required': true,
					'schema': {
						'type': 'integer'
					}
				}
			],
			'responses': {
				'200': {
					'description': 'Success',
				},
				'403': {
					'description': 'Forbidden. User is not in the chat'
				},
				'404': {
					'description': 'Not Found'
				},
				'500': {
					'description': 'Internal Error'
				}
			}
		}
	},
};
