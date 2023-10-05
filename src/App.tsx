import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './canvas';
import MainPage from "./mainpage";


function root() {
  return (
    <div className="App">
      <header className="App-header">
        <MainPage />
      </header>
    </div>
  );
}

function App2() {

  if (window.location.pathname === '/') {
   return root();
  }
}

export default App2;
