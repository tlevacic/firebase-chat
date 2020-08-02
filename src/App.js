import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/main.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
  return (
    <div className="bg-blue-500 max-h-screen">
      <div className="flex max-w-6xl mx-auto my-auto h-screen rounded">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
