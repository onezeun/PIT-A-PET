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
          <li className='item'>홈</li>
          <li className='item'>알림</li>
          <li className='item'>메세지</li>
          <li className='item'>검색</li>
          <li className='item'>마이홈</li>
        </ul>
      ) : null }
      <ul>
        <li className='item'>보관함</li>
        <li className='item'>정보수정</li>
        <li className='item'>로그아웃</li>
      </ul>
      <p>ⓒ onezeun.</p>
    </S.SideBarWrap>
  );
}
