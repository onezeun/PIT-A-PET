import React, { useEffect, useRef } from 'react';
import * as S from './Header.styles';

export default function Navbar() {
  return (
    <S.NavBox>
      <li>홈</li>
      <li>메세지</li>
      <li>검색</li>
      <li>마이홈</li>
    </S.NavBox>
  );
}
