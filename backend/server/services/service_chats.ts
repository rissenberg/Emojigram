import {InnerResponse} from "../model/InnerResponse";
import {ChatsRepository} from "../repository/repo_chats";
import {IChatsDB} from "../db/types";


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
			}
		}
	}

	getChatByID = (chatID: number): InnerResponse => {
		try {
			return this.ChatsRepository.getChatByID(chatID);
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			}
		}
	}

	createChat = (chat: IChatsDB, authorID: number): InnerResponse => {
		try {
			return this.ChatsRepository.createChat(chat, authorID);
		}
		catch (error) {
			return {
				status: 500,
				error: `Chats service error: ${String(error)}`,
			}
		}
	}
}
