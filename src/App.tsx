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
import Chat from 'pages/Chat';
import ChatRoom from 'pages/Chat/ChatRoom';

function App() {
  let user = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Header />
      <Routes>
        {user && user != null ? (
          <Route path='/' element={<Main />} />
        ) : (
          <Route path='/' element={<SignUp />} />
        )}
        <Route path='/main' element={<Main />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/userhome' element={<UserHome />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/chatroom/:id' element={<ChatRoom />} />
      </Routes>
    </>
  );
}

export default App;
