import { Db, MongoClient, ObjectId } from 'mongodb';
import { DB_NAME, MONGODB_URL } from '../config/config';

export class MongoDB {
	client: MongoClient;
	DB: Db | null;

	constructor() {
		this.client = new MongoClient(MONGODB_URL);
		this.DB = null;
	}

	async connect() {
		await this.client.connect();

		this.DB = this.client.db(DB_NAME);

		process.on('SIGINT', async () => {
			await this.client.close();
			process.exit(0);
		});
		process.on('uncaughtException', async () => {
			await this.client.close();
			process.exit(1);
		});
	}

	async close() {
		await this.client.close();
		this.DB = null;
	}

	getCollection<T extends { _id?: ObjectId }>(collectionName: string) {
		if (!this.DB)
			return;
		return this.DB.collection<T>(collectionName);
	}
}
