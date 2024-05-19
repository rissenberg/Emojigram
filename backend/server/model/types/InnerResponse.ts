export interface InnerResponse<T> {
	status: number,
	data?: T,
	error?: string,
}