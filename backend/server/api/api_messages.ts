import { Request, Response } from 'express';
import { MessagesService } from '../services/service_messages';
import { sendMessageValidator } from '../model/validators/MessageValidators';

// TODO delete MOCK
const currentUser = 'Yanka';

export class MessagesAPI {
	MessagesService: MessagesService;

	constructor() {
		this.MessagesService = new MessagesService();
	}

	sendMessage = async (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const message = req.body;
		if (!sendMessageValidator(message))
			return res.status(400).json({
				error: 'Invalid request body',
			});

		const response = await this.MessagesService.sendMessage(message, currentUser);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};
}
