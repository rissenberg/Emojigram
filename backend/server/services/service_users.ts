import { InnerResponse } from '../model/types/InnerResponse';
import { UsersRepository } from '../repository/repo_users';
import { IUserListResponse, IUserResponse } from '../model/types/Users';


export class UsersService {
	UsersRepository: UsersRepository;

	constructor() {
		this.UsersRepository = new UsersRepository();
	}

	getUserByID = async (userID: string)
		: Promise<InnerResponse<IUserResponse>> => {
		try {
			return await this.UsersRepository.getUserByID(userID);
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
