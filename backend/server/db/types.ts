import { ObjectId } from 'mongodb';

export interface IChatDoc {
	_id?: ObjectId,
	name: string,
	created: Date,
	avatar_url?: string,
	deleted: boolean,
	users: {
		username: string,
		role: 'default' | 'admin',
		joined_at: Date,
		removed: boolean
	}[]
}

export interface IUserDoc {
	_id?: ObjectId,
	username: string,
	email: string,
	password: string,
	created: Date,
	avatar_url?: string,
	deleted: boolean,
	chat_ids: string[]
}

export interface IMessageDoc {
	_id?: ObjectId,
	sender_id: string,
	receiver_id: string,
	sent_at: Date,
	content: string,
	deleted: boolean
}
