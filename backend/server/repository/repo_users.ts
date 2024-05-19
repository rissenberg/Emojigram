import { InnerResponse } from '../model/types/InnerResponse';
import { IUserListResponse, IUserResponse } from '../model/types/Users';
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

	getUserByID = async (username: string): Promise<InnerResponse<IUserResponse>> => {
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

	searchByUsername = async (username: string): Promise<InnerResponse<IUserListResponse>> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');

		if (!usersCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			if (username === '')
				return {
					status: 200,
					data: {
						users: [],
					}
				};

			const usersDB = await usersCollection.find({ username: { '$regex' : username, '$options' : 'i' } }).toArray();

			const response: IUserListResponse = {
				users: usersDB.map(user => ({
					id: user._id.toString(),
					username: user.username,
					email: user.email,
					avatar_url: user.avatar_url,
				}))
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
