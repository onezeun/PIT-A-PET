import React from 'react';
import * as S from './UserHome.styles';

import AllContainer from 'components/AllContainer';
import Card from 'components/Card';

export default function UserHome(): JSX.Element {
  return (
    <AllContainer>
      <S.UserWrap>
        <S.UserImg src={process.env.PUBLIC_URL + '/images/profile.png'} />
        <S.UserInfo>
          <S.CountWrap>
            <li>
              <span>30</span>게시글
            </li>
            <li>
              <span>30</span>팔로워
            </li>
            <li>
              <span>30</span>팔로잉
            </li>
          </S.CountWrap>
          <S.UserHomeBtn>팔로우/언팔로우/정보수정</S.UserHomeBtn>
        </S.UserInfo>
      </S.UserWrap>
      <S.PetWrap>
        <S.PetImgWrap>
          <img src={process.env.PUBLIC_URL + '/images/profile.png'} />
          <img src={process.env.PUBLIC_URL + '/images/profile.png'} />
          <img src={process.env.PUBLIC_URL + '/images/profile.png'} />
          <p>반려동물 이름~ 슬라이드 넣을예정</p>
        </S.PetImgWrap>
      </S.PetWrap>
      <S.Intro>
        소개글을 입력해주세요
      </S.Intro>
      {/* <Card></Card> */}
    </AllContainer>
  );
}
