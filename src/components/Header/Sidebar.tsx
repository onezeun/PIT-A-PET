import React, { useEffect, useRef } from 'react';
import * as S from './Header.styles';

interface Iprops {
  sideOpen: boolean;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resize: number;
}

export default function Sidebar({ sideOpen, setSideOpen, resize,}: Iprops): JSX.Element {
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
          <S.ListItem>홈</S.ListItem>
          <S.ListItem>알림</S.ListItem>
          <S.ListItem>메세지</S.ListItem>
          <S.ListItem>검색</S.ListItem>
          <S.ListItem>마이홈</S.ListItem>
        </ul>
      ) : null }
      <ul>
        <S.ListItem>보관함</S.ListItem>
        <S.ListItem>정보수정</S.ListItem>
        <S.ListItem>로그아웃</S.ListItem>
      </ul>
      <S.Copyright>ⓒ onezeun.</S.Copyright>
    </S.SideBarWrap>
  );
}
