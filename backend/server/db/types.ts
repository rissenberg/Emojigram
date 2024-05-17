export interface IChatsDB {
	_id: number,
	name: string,
	created: Date,
	avatar_url?: string,
	deleted: boolean,
	user_ids: {
		id: string,
		role: 'default' | 'admin',
		joined_at: Date,
		removed: boolean
	}[]
}

export interface IUsersDB {
	_id: string,
	email: string,
	password: string,
	created: Date,
	avatar_url?: string,
	deleted: boolean,
	chat_ids: number[]
}

export interface IMessagesDB {
	_id: number,
	sender_id: string,
	receiver_id: string | number,
	sent_at: Date,
	content: string,
	deleted: boolean
}
