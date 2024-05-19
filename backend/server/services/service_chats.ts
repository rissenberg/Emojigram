import { InnerResponse } from '../model/types/InnerResponse';
import { ChatsRepository } from '../repository/repo_chats';
import { IChatUsersList } from '../model/types/Users';
import { IChatResponse, IChatsListResponse, ICreateChatRequest } from '../model/types/Chats';


export class ChatsService {
	ChatsRepository: ChatsRepository;

	constructor() {
		this.ChatsRepository = new ChatsRepository();
	}

	getUsersChatsList = async (currentUser: string)
		: Promise<InnerResponse<IChatsListResponse>> => {
		try {
			return await this.ChatsRepository.getAllUsersChats(currentUser);
		} catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};

	getChatByID = async (chatID: string, currentUser: string)
		: Promise<InnerResponse<IChatResponse>> => {
		try {
			const response = await this.ChatsRepository.getChatByID(chatID);

			if (response.status === 200) {
				const user = response.data!.chat.users
					.find((user: IChatUsersList) => user.username === currentUser);
				if (!user || user.removed)
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

	createChat = async (chat: ICreateChatRequest, authorUsername: string)
		: Promise<InnerResponse<IChatResponse>> => {
		try {
			const response = await this.ChatsRepository.createChat(chat, authorUsername);

			if (response.status === 200)
				return this.ChatsRepository.getChatByID(response.data!.chatID);
			else
				return {
					status: response.status,
					error: response.error
				};

		} catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};

	addToChat = async (chatID: string, username: string, currentUser: string)
		: Promise<InnerResponse<null>> => {
		try {
			const chatReq = await this.ChatsRepository.getLightChatByID(chatID);

			if (chatReq.status !== 200)
				return {
					status: chatReq.status,
					error: chatReq.error
				};

			const currentUserInChat = chatReq.data!.chat.users
				.find((user: IChatUsersList) => user.username === currentUser);

			if (!currentUserInChat || currentUserInChat.removed)
				return {
					status: 403,
					error: 'Current user is not in the chat'
				};

			if (currentUserInChat.role !== 'admin')
				return {
					status: 403,
					error: 'Current user is not admin'
				};

			const userInChat = chatReq.data!.chat.users
				.find((user: IChatUsersList) => user.username === username);

			if (userInChat && !userInChat.removed)
				return {
					status: 200,
				};

			return await this.ChatsRepository.addToChat(chatID, username);

		} catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};

	removeFromChat = async (chatID: string, username: string, currentUser: string)
		: Promise<InnerResponse<null>> => {
		try {
			const chatReq = await this.ChatsRepository.getLightChatByID(chatID);

			if (chatReq.status !== 200)
				return {
					status: chatReq.status,
					error: chatReq.error
				};

			const currentUserInChat: IChatUsersList | undefined = chatReq.data!.chat.users
				.find((user: IChatUsersList) => user.username === currentUser);

			if (!currentUserInChat || currentUserInChat.removed )
				return {
					status: 403,
					error: 'Current user is not in the chat'
				};

			if (currentUserInChat.role !== 'admin' && currentUser !== username)
				return {
					status: 403,
					error: 'Current user is not admin'
				};

			return await this.ChatsRepository.removeFromChat(chatID, username);

		} catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			};
		}
	};
}
