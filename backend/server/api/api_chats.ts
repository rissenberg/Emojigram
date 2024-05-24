import { Response } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { ChatsService } from '../services/service_chats';
import { createChatValidator } from '../model/validators/ChatValidators';
import { userValidator } from '../model/validators/UserValidator';


export class ChatsAPI {
	ChatsService: ChatsService;

	constructor() {
		this.ChatsService = new ChatsService();
	}

	getUsersChatsList = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const currentUser = req.auth?.username;
		if (!currentUser)
			return res.status(401).json({
				error: 'User is not authorized',
			});

		const response = await this.ChatsService.getUsersChatsList(currentUser);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	getChatByID = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const currentUser = req.auth?.username;
		if (!currentUser)
			return res.status(401).json({
				error: 'User is not authorized',
			});

		const chatID = req.params.id;
		const response = await this.ChatsService.getChatByID(chatID, currentUser);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	createChat = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const currentUser = req.auth?.username;
		if (!currentUser)
			return res.status(401).json({
				error: 'User is not authorized',
			});

		const chat = req.body;
		if (!createChatValidator(chat))
			return res.status(400).json({
				error: 'Invalid request body',
			});

		const response = await this.ChatsService.createChat(chat, currentUser);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	addToChat = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const currentUser = req.auth?.username;
		if (!currentUser)
			return res.status(401).json({
				error: 'User is not authorized',
			});

		const chatID = req.params.id;

		const body = req.body;
		if (!userValidator(body))
			return res.status(400).json({
				error: 'Invalid request body',
			});

		const response = await this.ChatsService.addToChat(chatID, body.username, currentUser);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	removeFromChat = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const currentUser = req.auth?.username;
		if (!currentUser)
			return res.status(401).json({
				error: 'User is not authorized',
			});

		const chatID = req.params.id;

		const body = req.body;
		if (!userValidator(body))
			return res.status(400).json({
				error: 'Invalid request body',
			});

		const response = await this.ChatsService.removeFromChat(chatID, body.username, currentUser);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};
}
