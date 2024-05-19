import { InnerResponse } from '../model/types/InnerResponse';
import { ChatsRepository } from '../repository/repo_chats';
import { IChatUsersList } from '../model/types/Users';
import { ICreateChatRequest } from '../model/types/Chats';


export class ChatsService {
	ChatsRepository: ChatsRepository;

	constructor() {
		this.ChatsRepository = new ChatsRepository();
	}

	getUsersChatsList = async (userID: string): Promise<InnerResponse> => {
		try {
			return await this.ChatsRepository.getAllUsersChats(userID);
		} catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};

	getChatByID = async (chatID: string, currentUser: string): Promise<InnerResponse> => {
		try {
			const response = await this.ChatsRepository.getChatByID(chatID);

			if (response.status === 200 && !response.data.chat.users
				.map((user: IChatUsersList) => user.username)
				.includes(currentUser)) {
				return ({
					status: 403,
					error: 'User is not in the chat',
				});
			}

			return response;
		} catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};

	createChat = async (chat: ICreateChatRequest, authorUsername: string): Promise<InnerResponse> => {
		try {
			const response = await this.ChatsRepository.createChat(chat, authorUsername);

			if (response.status === 200)
				return this.ChatsRepository.getChatByID(response.data.chatID);
			else
				return response;
		} catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};
}
