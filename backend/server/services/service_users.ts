import crypto from 'crypto';
import { InnerResponse } from '../model/types/InnerResponse';
import { UsersRepository } from '../repository/repo_users';
import { IUserListResponse, IUserResponse, IUserSignup } from '../model/types/Users';
import { PASSWORD_SECRET } from '../config/config';


export class UsersService {
	UsersRepository: UsersRepository;

	constructor() {
		this.UsersRepository = new UsersRepository();
	}

	getByUsername = async (username: string)
		: Promise<InnerResponse<IUserResponse>> => {
		try {
			return await this.UsersRepository.getByUsername(username);
		}
		catch (error) {
			return {
				status: 500,
				error: `Users service error: ${String(error)}`,
			};
		}
	};

	checkUserPassword = async (login: string, password: string)
		: Promise<InnerResponse<IUserResponse>> => {
		try {
			const userRes = await this.UsersRepository.getUserWithPassword(login);

			if (userRes.status !== 200)
				return userRes;

			const passwordHash = crypto
				.createHmac('sha256', PASSWORD_SECRET)
				.update(password)
				.digest('hex');

			if (userRes.data?.user.password !== passwordHash)
				return {
					status: 403,
					error: 'Incorrect password'
				};

			return {
				status: 200,
				data: {
					user: {
						id: userRes.data.user.id,
						username: userRes.data.user.username,
						email: userRes.data.user.email,
						avatar_url: userRes.data.user.avatar_url,
					},
				}
			};
		}
		catch (error) {
			return {
				status: 500,
				error: `Users service error: ${String(error)}`,
			};
		}
	};

	createUser = async (user: IUserSignup)
		: Promise<InnerResponse<IUserResponse>> => {
		try {
			const checkUsername = await this.UsersRepository.getByUsername(user.username);
			if (checkUsername.status === 200)
				return {
					status: 409,
					error: 'This username is taken'
				};

			const checkEmail = await this.UsersRepository.getByEmail(user.email);

			if (checkEmail.status === 200)
				return {
					status: 409,
					error: 'This email is taken'
				};

			user.password = crypto
				.createHmac('sha256', PASSWORD_SECRET)
				.update(user.password)
				.digest('hex');

			return  await this.UsersRepository.createUser(user);

		}
		catch (error) {
			return {
				status: 500,
				error: `Users service error: ${String(error)}`,
			};
		}
	};

	searchByUsername = async (username: string, currentUser: string)
		: Promise<InnerResponse<IUserListResponse>> => {
		try {
			const res = await this.UsersRepository.searchByUsername(username);

			if (res.status !== 200)
				return res;

			return {
				status: 200,
				data: {
					users: res.data!.users.filter(user => user.username !== currentUser)
				}
			};
		}
		catch (error) {
			return {
				status: 500,
				error: `Users service error: ${String(error)}`,
			};
		}
	};
}
