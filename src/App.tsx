import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import Header from 'components/Header';
import Main from './pages/Main'
import SignUp from 'pages/SignUp';
import Login from 'pages/Login';
import MyPage from 'pages/MyPage';
import UserHome from 'pages/UserHome';

function App() {
  let user = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/userhome' element={<UserHome />} />
      </Routes>
    </>
  );
}

export default App;
