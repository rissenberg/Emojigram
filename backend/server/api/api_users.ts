import { Response } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { UsersService } from '../services/service_users';


export class UsersAPI {
	UsersService: UsersService;

	constructor() {
		this.UsersService = new UsersService();
	}

	getUserByID = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const username = req.params.username;
		const response = await this.UsersService.getByUsername(username);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};

	searchByUsername = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const currentUser = req.auth?.username;
		if (!currentUser)
			return res.status(401).json({
				error: 'User is not authorized',
			});

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
