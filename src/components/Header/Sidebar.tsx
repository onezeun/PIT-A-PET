import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { apiKey } from '../../Firebase';
import * as S from './Header.styles';

interface Iprops {
  sideOpen: boolean;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resize: number;
}

export default function Sidebar({ sideOpen, setSideOpen, resize }: Iprops): JSX.Element {
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  console.log('_session_key',_session_key)
  console.log('is_session',is_session)

  let navigate = useNavigate();
  const outside = useRef<any>();

  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsie);
    return () => {
      document.removeEventListener('mousedown', handlerOutsie);
    };
  });

  const handlerOutsie = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setSideOpen(false);
  };

  return (
    <S.SideBarWrap
      id="sidebar"
      ref={outside}
      className={sideOpen ? 'open' : ''}
    >
      <i
        className="ri-close-fill icolor"
        onClick={toggleSide}
        onKeyDown={toggleSide}
      ></i>
      {resize >= 768 ? (
        <ul>
          <S.ListItem onClick={() => { navigate('/') }}>홈</S.ListItem>
          <S.ListItem>알림</S.ListItem>
          <S.ListItem>메세지</S.ListItem>
          <S.ListItem>검색</S.ListItem>
          <S.ListItem onClick={() => { navigate('/userhome') }}>마이홈</S.ListItem>
        </ul>
      ) : null}
      <ul>
        {is_session ? (
          <>
            <S.ListItem>보관함</S.ListItem>
            <S.ListItem onClick={() => { navigate('/mypage'); toggleSide() }}>정보수정</S.ListItem>
            <S.ListItem>로그아웃</S.ListItem>
          </>
        ) : (
        <>
          <S.ListItem onClick={() => { navigate('/login'); toggleSide() }}>로그인</S.ListItem>
          <S.ListItem onClick={() => { navigate('/signup'); toggleSide() }}>회원가입</S.ListItem>
        </>
        )}
      </ul>
      <S.Copyright>ⓒ onezeun.</S.Copyright>
    </S.SideBarWrap>
  );
}
