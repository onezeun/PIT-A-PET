import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Header.styles';

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <S.NavBox>
      <li onClick={() => {navigate('/')}}>홈</li>
      <li>메세지</li>
      <li>검색</li>
      <li>마이홈</li>
    </S.NavBox>
  );
}
