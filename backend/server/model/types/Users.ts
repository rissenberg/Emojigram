export interface IUserResponse {
	user: {
		id: number,
		username: string,
		email: string,
		avatar?: string,
	}
}

export interface IChatUserList {
	id: number,
	role: string,
}
