import { InnerResponse } from '../model/types/InnerResponse';
import { MongoDB } from '../db/mongoDB';
import { IMessageDoc } from '../db/types';
import { ISendMessageRequest } from '../model/types/Messages';


export class MessagesRepository {
	Database: MongoDB;

	constructor() {
		this.Database = new MongoDB();

		this.Database.connect()
			.catch(err => {
				console.log(`Error during DB connection: ${err}`);
			});
	}

	sendMessage = async (message: ISendMessageRequest)
		: Promise<InnerResponse<null>> => {
		const messagesCollection = this.Database.getCollection<IMessageDoc>('messages');

		if (!messagesCollection)
			return {
				status: 500,
				error: 'Database error: Could not connect',
			};

		try {
			await messagesCollection.insertOne({
				sender_id: message.sender_id!,
				receiver_id: message.receiver_id,
				sent_at: new Date(),
				content: message.content,
				deleted: false,
			});

			return {
				status: 200
			};
		}
		catch (error) {
			return {
				status: 500,
				error: `Users repository error: ${String(error)}`,
			};
		}
	};
}
