import { Response } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { UsersService } from '../services/service_users';
import { IAuthUserResponse } from '../model/types/Users';
import { loginValidator, signupValidator } from '../model/validators/AuthValidators';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/security_conf';

export class AuthAPI {
	UsersService: UsersService;

	constructor() {
		this.UsersService = new UsersService();
	}

	login = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		if (req.auth)
			return res.status(403).json({ error: 'You have an active session - logout first' });

		const credentials = req.body;
		if (!loginValidator(credentials))
			return res.status(400).json({
				error: 'Invalid request body',
			});

		const { login, password } = credentials;
		const authCheck = await this.UsersService.checkUserPassword(login, password);

		if (authCheck.status !== 200)
			return res.status(authCheck.status).json({
				error: authCheck.error,
			});

		const user = authCheck.data!.user;

		const token = jwt.sign(
			{ username: user.username },
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRATION }
		);

		const response: IAuthUserResponse = { user, token };
		res.status(200).json(response);
	};

	signup = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		if (req.auth)
			return res.status(403).json({ error: 'You have an active session - logout first' });

		const body = req.body;
		if (!signupValidator(body))
			return res.status(400).json({
				error: 'Invalid request body',
			});

		const addUserRes = await this.UsersService.createUser(body);

		if (addUserRes.status !== 200)
			return res.status(addUserRes.status).json({
				error: addUserRes.error,
			});

		const user = addUserRes.data!.user;

		const token = jwt.sign(
			{ username: user.username },
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRATION }
		);

		const response: IAuthUserResponse = { user, token };
		res.status(200).json(response);
	};

	refreshJWT = async (req: JWTRequest, res: Response) => {
		console.log(req.method, req.url);

		const username = req.auth?.username;
		const authUser = await this.UsersService.getByUsername(username);

		if (authUser.status !== 200)
			return res.status(authUser.status).json({
				error: authUser.error,
			});

		const user = authUser.data!.user;

		const token = jwt.sign(
			{ username: user.username },
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRATION }
		);

		const response: IAuthUserResponse = { user, token };
		res.status(200).json(response);
	};
}
