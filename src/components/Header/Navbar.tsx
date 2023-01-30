import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './Header.styles';

export default function Navbar() {
  let navigate = useNavigate();
  return (
    <S.NavBox>
      <S.NavBoxItem
        onClick={() => {
          navigate('/');
        }}
      >
        <S.NavBoxImgWrap>
          <img src={process.env.PUBLIC_URL + '/images/eye.png'} alt="" />
        </S.NavBoxImgWrap>
        <p>둘러보기</p>
      </S.NavBoxItem>
      <S.NavBoxItem>
        <i className="ri-chat-1-fill"></i>
        <p>메세지</p>
      </S.NavBoxItem>
      <S.NavBoxItem>
        <i className="ri-search-line"></i>
        <p>검색</p>
      </S.NavBoxItem>
      <S.NavBoxItem
        onClick={() => {
          navigate('/userhome');
        }}
      >
        <i className="ri-user-heart-fill"></i>
        <p>마이홈</p>
      </S.NavBoxItem>
    </S.NavBox>
  );
}
