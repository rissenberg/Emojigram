// Response Body

export interface IMessageResponse {
	id: string,
	sender_id: string,
	content: string,
	sent_at: Date,
}

// Request Body

export interface ISendMessageRequest {
	sender_id?: string,
	receiver_id: string,
	content: string
}
