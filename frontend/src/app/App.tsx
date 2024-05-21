import React from 'react';
import './App.scss';
import { MainPage } from '../pages/MainPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/chats" element={<MainPage/>}/>
			</Routes>
		</div>
	);
};

export default App;
