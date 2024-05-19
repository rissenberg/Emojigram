import { InnerResponse } from '../model/types/InnerResponse';
import { IUserResponse } from '../model/types/Users';
import { MongoDB } from '../db/mongoDB';
import { IUserDoc } from '../db/types';


export class UsersRepository {
	Database: MongoDB;

	constructor() {
		this.Database = new MongoDB();

		this.Database.connect()
			.catch(err => {
				console.log(`Error during DB connection: ${err}`);
			});
	}

	getUserByID = async (username: string): Promise<InnerResponse> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');

		if (!usersCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			const userDB = await usersCollection.findOne({ username: username });

			if (!userDB)
				return {
					status: 404,
					error: 'User is not found',
				};

			const response: IUserResponse = {
				user: {
					id: userDB._id.toString(),
					username: userDB.username,
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
