export interface IUserResponse {
	user: {
		id: string,
		username: string,
		email: string,
		avatar_url?: string,
	}
}

export interface IChatUsersList {
	username: string,
	avatar_url?: string,
	role: 'default' | 'admin',
	joined_at: Date,
	removed: boolean
}
