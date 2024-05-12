import { DB_MOCK } from '../db/mock_db';
import {InnerResponse} from "../model/types/InnerResponse";
import {IChatResponse, IChatsListResponse, ICreateChatRequest} from "../model/types/Chats";
import {IMessageResponse} from "../model/types/Messages";
import {IUserResponse} from "../model/types/Users";

const DB = DB_MOCK;

export class ChatsRepository {
	getAllUsersChats = (userID: number): InnerResponse => {
		try {
			const chatsIDs = DB.users_chats
				.filter(item => item.user_id === userID)
				.map(item => item.chat_id);

			const response: IChatsListResponse = {
				chats: DB.chats
					.filter(chat => chatsIDs.includes(chat.id))
					.map(chat => {
						const lastMessageDB = DB.messages.findLast(msg => msg.chat_id === chat.id);
						const authorDB = lastMessageDB && DB.users[lastMessageDB.author_id - 1];

						const last_message: IMessageResponse | null = authorDB ? {
							id: lastMessageDB.id,
							content: lastMessageDB.content,
							sent_at: lastMessageDB.sent_at,
							author: {
								id: authorDB.id,
								username: authorDB.username,
								email: authorDB.email,
								avatar: authorDB.avatar,
							}
						} : null;

						return ({
							id: chat.id,
							name: chat.name,
							avatar: chat.avatar,
							type: chat.type,
							last_message,
						});
					})
			}

			return {
				status: 200,
				data: response,
			}
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats repository error: ${String(error)}`,
			}
		}
	}

	getChatByID = (chatID: number): InnerResponse => {
		try {
			const chatDB = DB.chats[chatID - 1];

			if (!chatDB) {
				return {
					status: 404,
					error: `Chat was not found`,
				}
			}

			const users: Array<IUserResponse | null> = DB.users_chats
				.filter(item => item.chat_id === chatID)
				.map(user_chat => {
					const user = DB.users[user_chat.user_id - 1];

					if (!user)
						return null

					return ({
						id: user.id,
						username: user.username,
						email: user.email,
						avatar: user.avatar,
						role: user_chat.role,
					});
				});

			const response: IChatResponse = {
				chat: {
					id: chatDB.id,
					name: chatDB.name,
					avatar: chatDB.avatar,
					type: chatDB.type,
					users,
				},
				messages: DB.messages
					.filter(msg => msg.chat_id === chatID)
					.map(msg => {
						const authorDB = DB.users[msg.author_id - 1];
						return ({
							id: msg.id,
							content: msg.content,
							sent_at: msg.sent_at,
							author: authorDB ? {
								id: authorDB.id,
								username: authorDB.username,
								email: authorDB.email,
								avatar: authorDB.avatar,
							} : null
						})
					}),
			}

			return {
				status: 200,
				data: response,
			}
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats repository error: ${String(error)}`,
			}
		}
	}

	createChat = (chat: ICreateChatRequest, authorID: number): InnerResponse => {
		try {
			const newChatID = DB.chats.push({
				id: DB.chats.length + 1,
				name: chat.name,
				avatar: chat.avatar,
				type: 'group',
				created_at: new Date(),
			});

			console.log(newChatID);

			DB.users_chats.push({
				id: DB.users_chats.length + 1,
				user_id: authorID,
				chat_id: newChatID,
				role: 'admin',
				joined_at: new Date(),
			});

			return {
				status: 200,
				data: {
					chatID: newChatID,
				},
			}
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats repository error: ${String(error)}`,
			}
		}
	}
}
