import React, { useState, useEffect } from 'react';
import * as S from './Header.styles';

import SideBarWrap from './Sidebar';
import Navbar from './Navbar';

export default function Header(): JSX.Element {
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const [resize, setResize] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const handleResize = () => {
    setResize(window.innerWidth);
  };

  const toggleSide = () => {
    setSideOpen(true);
  };

  return (
    <S.HeaderContainer>
      <S.LogoWrap>
        <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
      </S.LogoWrap>
      <S.GNB>
        {resize < 768 ? (
          <>
            <i className="ri-bell-line icolor"></i>
            <span onClick={toggleSide}>
              <i className="ri-menu-line icolor"></i>
            </span>
            <Navbar></Navbar>
          </>
        ) : null}
        <SideBarWrap
          sideOpen={sideOpen}
          setSideOpen={setSideOpen}
          resize={resize}
        ></SideBarWrap>
      </S.GNB>
    </S.HeaderContainer>
  );
}
