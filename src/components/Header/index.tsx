import React, { useState } from 'react';
import * as S from './Header.styles'
import logoPath from '../../assets/images/logo.png'

import SideBarWrap from './Sidebar';

export default function Header() :JSX.Element {
  // useState로 관리해 줄 state 의 type 설정
  const [sideOpen , setSideOpen] = useState<boolean>(false);

  const toggleSide = () => {
    setSideOpen(true);
  }

  return(
    <S.HeaderContainer>
      <S.LogoWrap>
        <img src={logoPath} alt='logo' />
      </S.LogoWrap>
      <S.GNB>
        {/* <i className="ri-chat-1-line icolor"></i> */}
        <i className="ri-bell-line icolor"></i>
        <S.MenuBtn onClick={toggleSide}>
          <i className="ri-menu-line icolor"></i>
        </S.MenuBtn>
        <SideBarWrap sideOpen={sideOpen} setSideOpen={setSideOpen}></SideBarWrap>
      </S.GNB>
    </S.HeaderContainer>
  )
}