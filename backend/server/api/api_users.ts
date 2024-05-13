import { Request, Response } from 'express';
import { UsersService } from '../services/service_users';
import { API_PATH_PREFIX } from '../config/config';


export class UsersAPI {
	UsersService: UsersService;

	constructor() {
		this.UsersService = new UsersService();
	}

	getUserByID = (req: Request, res: Response) => {
		console.log(req.method, req.url);

		const userID = parseInt(req.params.id);
		const response = this.UsersService.getUserByID(userID);

		if (response.status === 200)
			return res.status(200).json(response.data);
		else
			return res.status(response.status).json({
				error: response.error,
			});
	};
}


export const swUsersRoute = {
	[`${API_PATH_PREFIX}/users/{id}`]: {
		'get': {
			'summary': 'Get user by id',
			'tags': [
				'Users'
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
