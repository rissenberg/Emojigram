export const loginValidator = (body: any) => {
	if (!body.login)
		return false;
	else if (typeof body?.login !== 'string')
		return false;

	if (!body.password)
		return false;
	else if (typeof body?.password !== 'string')
		return false;

	return true;
};

export const signupValidator = (body: any) => {
	if (!body.username)
		return false;
	else if (typeof body?.username !== 'string')
		return false;

	if (!body.email)
		return false;
	else if (typeof body?.email !== 'string')
		return false;

	if (!body.password)
		return false;
	else if (typeof body?.password !== 'string')
		return false;

	if (body.avatar && typeof body.avatar !== 'string')
		return false;

	return true;
};
