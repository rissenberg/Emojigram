export interface IUserWithPassword {
	user: {
		id: string,
		username: string,
		password: string,
		email: string,
		avatar_url?: string,
	}
}


export interface IUserResponse {
	user: {
		id: string,
		username: string,
		email: string,
		avatar_url?: string,
	}
}

export interface IAuthUserResponse {
	user: {
		id: string,
		username: string,
		email: string,
		avatar_url?: string
	},
	token: string
}

export interface IUserListResponse {
	users: {
		id: string,
		username: string,
		email: string,
		avatar_url?: string,
	}[]
}

export interface IChatUsersList {
	username: string,
	avatar_url?: string,
	role: 'default' | 'admin',
	joined_at: Date,
	removed: boolean
}

export interface IUserSignup {
	username: string,
	password: string,
	email: string,
	avatar?: string,
}
