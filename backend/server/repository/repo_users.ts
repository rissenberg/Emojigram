import { InnerResponse } from '../model/types/InnerResponse';
import { IUserListResponse, IUserResponse, IUserSignup, IUserWithPassword } from '../model/types/Users';
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

	getByUsername = async (username: string)
		: Promise<InnerResponse<IUserResponse>> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');

		if (!usersCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			const userDB = await usersCollection.findOne({ username: username });

			if (!userDB || userDB.deleted)
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

	getByEmail = async (email: string)
		: Promise<InnerResponse<IUserResponse>> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');

		if (!usersCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			const userDB = await usersCollection.findOne({ email: email });

			if (!userDB || userDB.deleted)
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

	getUserWithPassword = async (login: string)
		: Promise<InnerResponse<IUserWithPassword>> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');

		if (!usersCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			const userDB = await usersCollection.findOne({ '$or': [
				{ username: login },
				{ email: login },
			] } );

			if (!userDB || userDB.deleted)
				return {
					status: 404,
					error: 'Incorrect login',
				};

			const response: IUserWithPassword = {
				user: {
					id: userDB._id.toString(),
					username: userDB.username,
					password: userDB.password,
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

	createUser = async (user: IUserSignup)
		: Promise<InnerResponse<IUserResponse>> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');

		if (!usersCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			const { username, email, password, avatar } = user;

			const newUser = {
				username,
				email,
				password,
				created: new Date(),
				avatar_url: avatar,
				deleted: false,
				chat_ids: []
			};

			const result = await usersCollection.insertOne(newUser);

			return {
				status: 200,
				data: {
					user: {
						id: result.insertedId.toString(),
						username: newUser.username,
						email: newUser.email,
						avatar_url: newUser.avatar_url,
					}
				}
			};
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats repository error: ${String(error)}`,
			};
		}
	};

	searchByUsername = async (username: string)
		: Promise<InnerResponse<IUserListResponse>> => {
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

			const usersDB = await usersCollection
				.find({ '$and': [
					{ username: { '$regex' : username, '$options' : 'i' } },
					{ deleted: false }
				] })
				.limit(50)
				.toArray();

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
