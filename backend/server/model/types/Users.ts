export interface IUserResponse {
	user: {
		id: string,
		email: string,
		avatar_url?: string,
	}
}

export interface IChatUserList {
	id: number,
	role: string,
}
