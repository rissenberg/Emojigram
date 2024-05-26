import React, { useEffect } from 'react';
import './App.scss';
import { MainPage } from '../pages/MainPage';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { LandingPage } from '../pages/LandingPage';
import { useCheckAuth } from '../features/Authorization';

const App = () => {
	const { checkAuth, isDone } = useCheckAuth();

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<div className="App">

			{ !isDone && <div className="check-auth_loading" /> }

			<Routes>
				<Route path="/chats" element={<MainPage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="*" element={<LandingPage/>}/>
			</Routes>
		</div>
	);
};

export default App;
