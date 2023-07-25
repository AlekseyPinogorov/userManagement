import React from 'react';
import './style.css';
import { UsersForm } from './components/UsersForm'
import { UsersTable } from './components/UsersTable';
import { UsersContextProvider } from './context/usersData';

function App() {
  return (
    <UsersContextProvider>
      <div className="app">
        <h1 className='header'>User Management</h1>
        <UsersForm />
        <UsersTable />
      </div>
    </UsersContextProvider>
  );
}

export default App;
