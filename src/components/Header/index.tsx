import React from 'react';
import * as S from './Header.styles'
import logoPath from '../../assets/images/logo.png'


export default function Main() {
  return(
    <S.HeaderContainer>
      <S.LogoWrap>
        <img src={logoPath} alt='logo' />
      </S.LogoWrap>
      <S.GNB>
        <i className="ri-chat-1-line icolor"></i>
        <i className="ri-bell-line icolor"></i>
        <i className="ri-menu-line icolor"></i>
      </S.GNB>
    </S.HeaderContainer>
  )
}