import { DB_MOCK } from '../db/mock_db';
import { InnerResponse } from '../model/types/InnerResponse';
import { IChatCreateResponse, IChatResponse, IChatsListResponse, ICreateChatRequest } from '../model/types/Chats';
import { IMessageResponse } from '../model/types/Messages';
import { IChatsDB } from '../db/types';

const DB = DB_MOCK;

export class ChatsRepository {
	getAllUsersChats = (username: string): InnerResponse => {
		try {
			const currentUser = DB.users.get(username);
			if (!currentUser) {
				return {
					status: 404,
					error: 'Current user is not found'
				};
			}

			const chats: IChatsDB[] = [];

			currentUser.chat_ids.forEach(chatID => {
				const chat = DB.chats.get(chatID);

				if (chat && !chat.deleted)
					chats.push(chat);
			});

			const response: IChatsListResponse = {
				chats: chats.map(chat => {
					const lastMessageDB = Array.from(DB.messages.values())
						.findLast(msg => msg.receiver_id === chat._id && !msg.deleted);

					const last_message = lastMessageDB ?
						{
							sender_id: lastMessageDB.sender_id,
							sent_at: lastMessageDB.sent_at,
							content: lastMessageDB.content,
						} : null;

					return ({
						id: chat._id,
						name: chat.name,
						avatar_url: chat.avatar_url,
						last_message,
					});
				})
			};

			return {
				status: 200,
				data: response
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
					error: 'Chat is not found',
				};
			}

			const messages: IMessageResponse[] = [];
			DB.messages.forEach((msg) => {
				if (msg.receiver_id === chatID)
					messages.push({
						id: msg._id,
						content: msg.content,
						sent_at: msg.sent_at,
						sender_id: msg.sender_id
					});
			});

			const response: IChatResponse = {
				chat: {
					id: chatDB._id,
					name: chatDB.name,
					avatar_url: chatDB.avatar_url,
					created: chatDB.created,
					users: chatDB.user_ids.map(item => {
						const user = DB.users.get(item.id);
						return ({
							...item,
							avatar_url: user?.avatar_url,
						});
					})
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

	createChat = (chat: ICreateChatRequest, authorID: string): InnerResponse => {
		try {
			const newChatID = DB.chats.size + 1;
			DB.chats.set(
				newChatID,
				{
					_id: newChatID,
					name: chat.name,
					avatar_url: chat.avatar_url,
					created: new Date(),
					deleted: false,
					user_ids: [
						{
							id: authorID,
							role: 'admin',
							joined_at: new Date(),
							removed: false,
						}
					]
				}
			);

			DB.users.get(authorID)?.chat_ids.push(newChatID);

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
