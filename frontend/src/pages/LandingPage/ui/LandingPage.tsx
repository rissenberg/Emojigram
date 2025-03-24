import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../../entities/User';


export const LandingPage = () => {
	const { currentUser } = useCurrentUser();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (currentUser)
			navigate('/chats');
		else
			navigate('/login');
	}, []);

	return <></>;
};
