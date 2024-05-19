import { InnerResponse } from '../model/types/InnerResponse';
import { IChatResponse, IChatsListItem, IChatsListResponse, ICreateChatRequest } from '../model/types/Chats';
import { IMessageResponse } from '../model/types/Messages';
import { IChatDoc, IMessageDoc, IUserDoc } from '../db/types';
import { MongoDB } from '../db/mongoDB';
import { ObjectId } from 'mongodb';
import { IChatUsersList } from '../model/types/Users';


export class ChatsRepository {
	Database: MongoDB;

	constructor() {
		this.Database = new MongoDB();

		this.Database.connect()
			.catch(err => {
				console.log(`Error during DB connection: ${err}`);
			});
	}
	
	getAllUsersChats = async (username: string): Promise<InnerResponse> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');
		const chatsCollection = this.Database.getCollection<IChatDoc>('chats');
		const messagesCollection = this.Database.getCollection<IMessageDoc>('messages');

		if (!usersCollection || !chatsCollection || !messagesCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			const currentUser = await usersCollection.findOne({ username: username });

			if (!currentUser)
				return {
					status: 404,
					error: 'Current auth user is not found'
				};

			const chats: IChatsListItem[] = [];

			for (const chatID of currentUser.chat_ids) {
				const chat = await chatsCollection.findOne({ _id: new ObjectId(chatID) });

				if (chat && !chat.deleted){
					const lastMessageDB = await messagesCollection
						.find({ $and: [{ receiver_id: chat._id.toString() }, { deleted: false }] })
						.sort({ sent_at: -1 })
						.limit(1)
						.toArray();

					const last_message = lastMessageDB[0] ?
						{
							sender_id: lastMessageDB[0].sender_id.toString(),
							sent_at: lastMessageDB[0].sent_at,
							content: lastMessageDB[0].content,
						} : null;

					chats.push({
						id: chat._id.toString(),
						name: chat.name,
						avatar_url: chat.avatar_url,
						last_message,
					});
				}
			}

			const response: IChatsListResponse = {
				chats
			};

			return {
				status: 200,
				data: response
			};
		} catch (error) {
			return {
				status: 500,
				error: `Chats repository error: ${String(error)}`,
			};
		}
	};

	getChatByID = async (chatID: string): Promise<InnerResponse> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');
		const chatsCollection = this.Database.getCollection<IChatDoc>('chats');
		const messagesCollection = this.Database.getCollection<IMessageDoc>('messages');

		if (!usersCollection || !chatsCollection || !messagesCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			const chatDB = await chatsCollection.findOne({ _id: new ObjectId(chatID) });

			if (!chatDB) {
				return {
					status: 404,
					error: 'Chat is not found',
				};
			}

			const messages: IMessageResponse[] = (await messagesCollection
				.find({ receiver_id: chatID })
				.sort({ sent_at: -1 })
				.toArray())
				.map(msg => ({
					id: msg._id.toString(),
					sender_id: msg.sender_id,
					sent_at: msg.sent_at,
					content: msg.content
				}));

			const users: IChatUsersList[] = [];
			chatDB.users.map(async item => {
				const user = await usersCollection.findOne({ username: item.username });
				users.push({
					...item,
					avatar_url: user?.avatar_url,
				});
			});

			const response: IChatResponse = {
				chat: {
					id: chatDB._id.toString(),
					name: chatDB.name,
					avatar_url: chatDB.avatar_url,
					created: chatDB.created,
					users,
				},
				messages,
			};

			return {
				status: 200,
				data: response,
			};
		} catch (error) {
			return {
				status: 500,
				error: `Chats repository error: ${String(error)}`,
			};
		}
	};

	createChat = async (chat: ICreateChatRequest, authorUsername: string): Promise<InnerResponse> => {
		const usersCollection = this.Database.getCollection<IUserDoc>('users');
		const chatsCollection = this.Database.getCollection<IChatDoc>('chats');

		if (!usersCollection || !chatsCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			const result = await chatsCollection.insertOne({
				name: chat.name,
				avatar_url: chat.avatar,
				created: new Date(),
				deleted: false,
				users: [
					{
						username: authorUsername,
						role: 'admin',
						joined_at: new Date(),
						removed: false,
					}
				]
			});

			const newChatID = result.insertedId.toString();

			await usersCollection.updateOne(
				{ username: authorUsername },
				{ $push: { chat_ids: newChatID } }
			);

			return {
				status: 200,
				data: {
					chatID: newChatID,
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
}
