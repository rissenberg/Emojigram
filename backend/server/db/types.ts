export interface IChatsDB {
	id: number,
	name?: string,
	type: 'group' | 'dialog',
	avatar?: string,
	created_at: Date,
}


export interface IUsersDB {
	id: number,
	username: string,
	email: string,
	password: string,
	avatar?: string,
	created_at: Date,
}

export interface IUsersChatsDB {
	id: number,
	user_id: number,
	chat_id: number,
	role: 'admin' | 'default',
	joined_at?: Date,
}

export interface IMessagesDB {
	id: number,
	author_id: number,
	chat_id: number,
	content: string,
	sent_at: Date,
}
