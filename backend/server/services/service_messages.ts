import { InnerResponse } from '../model/types/InnerResponse';
import { MessagesRepository } from '../repository/repo_messages';
import { ChatsRepository } from '../repository/repo_chats';
import { IChatUsersList } from '../model/types/Users';
import { ISendMessageRequest } from '../model/types/Messages';


export class MessagesService {
	MessagesRepository: MessagesRepository;
	ChatsRepository: ChatsRepository;

	constructor() {
		this.MessagesRepository = new MessagesRepository();
		this.ChatsRepository = new ChatsRepository();
	}

	sendMessage = async (message: ISendMessageRequest, currentUser: string)
		: Promise<InnerResponse<null>> => {
		try {
			const chatReq = await this.ChatsRepository.getLightChatByID(message.receiver_id);

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

			return await this.MessagesRepository.sendMessage({
				...message,
				sender_id: currentUser
			});

		} catch (error) {
			return {
				status: 500,
				error: `Messages service error: ${String(error)}`,
			};
		}
	};
}
