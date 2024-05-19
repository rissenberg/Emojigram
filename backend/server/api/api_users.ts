import { Request, Response } from 'express';
import { UsersService } from '../services/service_users';


export class UsersAPI {
	UsersService: UsersService;

	constructor() {
		this.UsersService = new UsersService();
	}

	getUserByID = async (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const userID = req.params.id;
		const response = await this.UsersService.getUserByID(userID);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};
}
