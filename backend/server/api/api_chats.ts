import { Request, Response } from 'express';
import { ChatsService } from '../services/service_chats';
import { createChatValidator } from '../model/validators/ChatValidators';

// TODO delete MOCK
const username = 'Yanka';

export class ChatsAPI {
	ChatsService: ChatsService;

	constructor() {
		this.ChatsService = new ChatsService();
	}

	getUsersChatsList = async (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const response = await this.ChatsService.getUsersChatsList(username);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	getChatByID = async (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const chatID = req.params.id;
		const response = await this.ChatsService.getChatByID(chatID, username);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	createChat = async (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const chat = req.body;
		if (!createChatValidator(chat))
			return res.status(400).json({
				error: 'Invalid request body',
			});

		const response = await this.ChatsService.createChat(chat, username);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};
}
