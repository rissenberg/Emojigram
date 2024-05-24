import { Response } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { MessagesService } from '../services/service_messages';
import { sendMessageValidator } from '../model/validators/MessageValidators';


export class MessagesAPI {
	MessagesService: MessagesService;

	constructor() {
		this.MessagesService = new MessagesService();
	}

	sendMessage = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const currentUser = req.auth?.username;
		if (!currentUser)
			return res.status(401).json({
				error: 'User is not authorized',
			});

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
