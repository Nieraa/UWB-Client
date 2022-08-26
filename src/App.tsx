import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SideNavbar } from './components/sideNavbar/SideNavbar';
import { AppBar } from './components/appBar/AppBar';
import { Main } from './components/main/Main';

function App() {
  return (
    <div className="App">
      <AppBar />
      <SideNavbar items={[]} />
      <Main />
    </div>
  );
}

export default App;
