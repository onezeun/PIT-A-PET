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
        <i className="fas fa-solid fa-comment-dots"></i>
        <i className="fas fa-solid fa-bell"></i>
        <S.HambergerWrap></S.HambergerWrap>
      </S.GNB>
    </S.HeaderContainer>
  )
}