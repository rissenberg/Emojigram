export const sendMessageValidator = (body: any) => {
	if (!body.receiver_id)
		return false;
	else if (typeof body.receiver_id !== 'string')
		return false;

	if (!body.content)
		return false;
	else if (typeof body.content !== 'string' || body.content === '')
		return false;

	return true;
};
