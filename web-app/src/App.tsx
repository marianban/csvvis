import React from 'react';
import './App.scss';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Header />
      <main className="main">
        Hello <b>Hi</b>
      </main>
    </div>
  );
}

export default App;
