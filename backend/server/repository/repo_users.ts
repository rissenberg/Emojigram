import { DB_MOCK } from '../db/mock_db';
import { InnerResponse } from '../model/types/InnerResponse';
import { IUserResponse } from '../model/types/Users';

const DB = DB_MOCK;

export class UsersRepository {
	getUserByID = (userID: string): InnerResponse => {
		try {
			const userDB = DB.users.get(userID);

			if (!userDB)
				return {
					status: 404,
					error: 'User is not found',
				};

			const response: IUserResponse = {
				user: {
					id: userDB._id,
					email: userDB.email,
					avatar_url: userDB.avatar_url,
				}
			};

			return {
				status: 200,
				data: response,
			};
		}
		catch (error) {
			return {
				status: 500,
				error: `Users repository error: ${String(error)}`,
			};
		}
	};
}
