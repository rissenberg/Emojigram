import { DB_MOCK } from '../db/mock_db';
import { InnerResponse } from '../model/types/InnerResponse';
import { IChatResponse, ICreateChatRequest } from '../model/types/Chats';
import { IMessageResponse } from '../model/types/Messages';
import { IChatUserList } from '../model/types/Users';

const DB = DB_MOCK;

export class ChatsRepository {
	getAllUsersChats = (userID: number): InnerResponse => {
		try {
			const chatsIDs: number[] = [];
			DB.users_chats.forEach((item) => {
				if (item.user_id === userID)
					chatsIDs.push(item.chat_id);
			});

			const chats = chatsIDs.map(chatID => {
				const chat = DB.chats.get(chatID);

				let last_message: IMessageResponse | null = null;
				DB.messages.forEach(msg => {
					if (msg.chat_id === chatID)
						last_message = {
							id: msg.id,
							content: msg.content,
							sent_at: msg.sent_at,
							author_id: msg.author_id
						};
				});

				return chat && {
					id: chat.id,
					name: chat.name,
					avatar: chat.avatar,
					type: chat.type,
					last_message,
				};
			}).filter(chat => chat !== undefined);

			return {
				status: 200,
				data: {
					chats
				},
			};
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats repository error: ${String(error)}`,
			};
		}
	};

	getChatByID = (chatID: number): InnerResponse => {
		try {
			const chatDB = DB.chats.get(chatID);

			if (!chatDB) {
				return {
					status: 404,
					error: 'Chat was not found',
				};
			}

			const users: IChatUserList[] = [];
			DB.users_chats.forEach((item) => {
				if (item.chat_id === chatID)
					users.push({
						id: item.user_id,
						role: item.role
					});
			});

			const messages: IMessageResponse[] = [];
			DB.messages.forEach((msg) => {
				if (msg.chat_id === chatID)
					messages.push({
						id: msg.id,
						content: msg.content,
						sent_at: msg.sent_at,
						author_id: msg.author_id
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
				messages: messages.reverse(),
			};

			return {
				status: 200,
				data: response,
			};
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats repository error: ${String(error)}`,
			};
		}
	};

	createChat = (chat: ICreateChatRequest, authorID: number): InnerResponse => {
		try {
			const newChatID = DB.chats.size + 1;
			DB.chats.set(
				newChatID,
				{
					id: newChatID,
					name: chat.name,
					avatar: chat.avatar,
					type: 'group',
					created_at: new Date(),
				}
			);

			DB.users_chats.set(
				DB.users_chats.size + 1,
				{
					id: DB.users_chats.size + 1,
					user_id: authorID,
					chat_id: newChatID,
					role: 'admin',
					joined_at: new Date(),
				}
			);

			return {
				status: 200,
				data: {
					chatID: newChatID,
				},
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
