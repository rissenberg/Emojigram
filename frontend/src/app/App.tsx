import React from 'react';
import './App.scss';
import { MainPage } from '../pages/MainPage';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { LandingPage } from '../pages/LandingPage';

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/chats" element={<MainPage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="*" element={<LandingPage/>}/>
			</Routes>
		</div>
	);
};

export default App;
