export const userValidator = (body: any) => {
	if (!body.username)
		return false;
	else if (typeof body?.username !== 'string')
		return false;

	return true;
};