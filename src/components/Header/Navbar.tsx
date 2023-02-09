import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import * as S from './Header.styles';

export default function Navbar() {
  let navigate = useNavigate();
  let isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <S.NavBox>
      {isLoggedIn ? (
        <>
          <S.NavBoxItem
            onClick={() => {
              navigate('/');
            }}
          >
            <S.NavBoxImgWrap
              onClick={() => {
                navigate('/');
              }}
            >
              <img src={process.env.PUBLIC_URL + '/images/eye.png'} alt="" />
            </S.NavBoxImgWrap>
            <p>둘러보기</p>
          </S.NavBoxItem>
          <S.NavBoxItem
            onClick={() => {
              navigate('/chat');
            }}
          >
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
        </>
      ) : (
        <>
          <S.NavBoxItem
            onClick={() => {
              navigate('/');
            }}
          >
            <S.NavBoxImgWrap
              onClick={() => {
                navigate('/');
              }}
            >
              <img src={process.env.PUBLIC_URL + '/images/eye.png'} alt="" />
            </S.NavBoxImgWrap>
            <p>둘러보기</p>
          </S.NavBoxItem>
          <S.NavBoxItem>
            <i className="ri-search-line"></i>
            <p>검색</p>
          </S.NavBoxItem>
        </>
      )}
    </S.NavBox>
  );
}
