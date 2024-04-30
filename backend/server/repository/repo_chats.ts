import { DB_MOCK } from '../db/mock_db';
import {IChatsDB} from "../db/types";
import {InnerResponse} from "../model/InnerResponse";
import {IChatResponse, IChatsListResponse} from "../model/Chats";
import {IMessageResponse} from "../model/Messages";
import {IUserResponse} from "../model/Users";

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
						const authorDB = lastMessageDB && DB.users.find(user => user.id === lastMessageDB.author_id);

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
			const chatDB = DB.chats.find(chat => chat.id === chatID);

			if (!chatDB) {
				return {
					status: 404,
					error: `Chat was not found`,
				}
			}

			const users: Array<IUserResponse | null> = DB.users_chats
				.filter(item => item.chat_id === chatID)
				.map(user_chat => {
					const user = DB.users.find(user => user.id === user_chat.user_id);

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
						const authorDB = DB.users.find(user => user.id === msg.author_id);
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

	createChat = (chat: IChatsDB, authorID: number): InnerResponse => {
		try {
			const newChat: IChatsDB = {
				id: DB.chats_counter,
				name: chat.name,
				avatar: chat.avatar,
				type: 'group',
				created_at: new Date(),
			};

			DB.chats.push(newChat);

			DB.users_chats.push({
				id: DB.users_chats_counter,
				user_id: authorID,
				chat_id: DB.chats_counter,
				role: 'admin',
				joined_at: new Date(),
			});

			DB.chats_counter++;
			DB.users_chats_counter++;

			return {
				status: 200,
				data: newChat,
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
