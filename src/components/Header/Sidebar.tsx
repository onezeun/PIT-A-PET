import React, { useEffect, useRef } from 'react';
import * as S from './Header.styles'

interface Iprops {
  sideOpen: boolean,
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({sideOpen, setSideOpen}: Iprops) :JSX.Element {
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
  }

  return(
    <S.SideBarWrap id="sidebar" ref={outside} className={sideOpen ? 'open' : ''}>
      <i className="ri-close-fill icolor" onClick={toggleSide} onKeyDown={toggleSide}></i>
      <ul>
        <li>내가 좋아하는 사진</li>
        <li>정보수정</li>
        <li>로그아웃</li>
      </ul>
    </S.SideBarWrap>
  )
}