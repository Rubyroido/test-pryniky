import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Notfound from '../Notfound/Notfound';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<Notfound />} />
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
