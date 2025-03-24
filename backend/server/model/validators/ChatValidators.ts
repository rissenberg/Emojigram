export const createChatValidator = (body: any) => {
	if (!body.name)
		return false;
	else if (typeof body?.name !== 'string')
		return false;

	if (body.avatar && typeof body.avatar !== 'string')
		return false;

	return true;
};
