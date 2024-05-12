interface IBody {
	name?: string;
	avatar?: string;
	type?: string;
}

export const createChatValidator = (body: IBody) => {
	if (!body.name)
		return false;
	else if (typeof body?.name !== 'string')
		return false;

	if (body.avatar && typeof body.avatar !== 'string')
		return false;

	if (!body.type)
		return false;
	else if (body.type !== 'group' && body.type !== 'dialog')
		return false;

	return true;
};
