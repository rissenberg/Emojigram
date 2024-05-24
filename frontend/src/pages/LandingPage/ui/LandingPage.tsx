import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const LandingPage = () => {
	const navigate = useNavigate();
	
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token)
			navigate('/chats');
		else
			navigate('/login');
	}, []);

	return (
		<></>
	);
};
