import React from 'react';
import './App.scss';
import {MainPage} from "../pages/MainPage";
import {StoreProvider} from "./providers/StoreProvider/ui/StoreProvider";

const App = () => {
  return (
    <StoreProvider>
      <div className="App">
        <MainPage/>
      </div>
    </StoreProvider>
  );
}

export default App;
