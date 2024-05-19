import { Request, Response } from 'express';
import { UsersService } from '../services/service_users';

// TODO delete MOCK
const currentUser = 'Yanka';

export class UsersAPI {
	UsersService: UsersService;

	constructor() {
		this.UsersService = new UsersService();
	}

	getUserByID = async (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const username = req.params.username;
		const response = await this.UsersService.getUserByID(username);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	searchByUsername = async (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const username = req.params.username;
		const response = await this.UsersService.searchByUsername(username, currentUser);
		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};
}
