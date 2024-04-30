import { Request, Response } from 'express';
import {ChatsService} from "../services/service_chats";

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

		if (response.status === 200) {
			return res.status(200).json(response.data);
		}
		else {
			return res.status(response.status).json({
				error: response.error,
			});
		}
	}

	getChatByID = (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const chatID = parseInt(req.params.id);
		const response = this.ChatsService.getChatByID(chatID);

		if (response.status === 200) {
			return res.status(200).json(response.data);
		}
		else {
			return res.status(response.status).json({
				error: response.error,
			});
		}
	}

	createChat = (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const chat = req.body;

		const response = this.ChatsService.createChat(chat, userID);

		if (response.status === 200) {
			return res.status(200).json(response.data);
		}
		else {
			return res.status(response.status).json({
				error: response.error,
			});
		}
	}
}