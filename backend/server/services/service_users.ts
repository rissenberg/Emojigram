import { InnerResponse } from '../model/types/InnerResponse';
import { UsersRepository } from '../repository/repo_users';


export class UsersService {
	UsersRepository: UsersRepository;

	constructor() {
		this.UsersRepository = new UsersRepository();
	}

	getUserByID = (userID: number): InnerResponse => {
		try {
			return this.UsersRepository.getUserByID(userID);
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};
}
