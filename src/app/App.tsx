import React from 'react';
import './App.scss';
import {MainPage} from "../pages/MainPage";
import {StoreProvider} from "./providers/StoreProvider/ui/StoreProvider";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/chats" element={<MainPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
