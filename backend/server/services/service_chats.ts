import { InnerResponse } from '../model/types/InnerResponse';
import { ChatsRepository } from '../repository/repo_chats';
import { IUserResponse } from '../model/types/Users';
import { ICreateChatRequest } from '../model/types/Chats';


export class ChatsService {
	ChatsRepository: ChatsRepository;

	constructor() {
		this.ChatsRepository = new ChatsRepository();
	}

	getUsersChatsList = (userID: number): InnerResponse => {
		try {
			return this.ChatsRepository.getAllUsersChats(userID);
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};

	getChatByID = (chatID: number, currentUserID: number): InnerResponse => {
		try {
			const response = this.ChatsRepository.getChatByID(chatID);

			if (response.status === 200 && !response.data.chat.users
				.map((user: IUserResponse) => user.id)
				.includes(currentUserID)) {
				return ({
					status: 403,
					error: 'Chats service error: User is not in the chat',
				});
			}

			return response;
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};

	createChat = (chat: ICreateChatRequest, authorID: number): InnerResponse => {
		try {
			const response = this.ChatsRepository.createChat(chat, authorID);

			if (response.status === 200)
				return this.ChatsRepository.getChatByID(response.data.chatID);
			else
				return response;
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};
}
