import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Header from 'components/Header';
import Main from './pages/Main'
import Register from 'pages/Register';
import Login from 'pages/Login';
import MyPage from 'pages/MyPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
