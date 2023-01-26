import React, { useState, useEffect } from 'react';
import * as S from './Card.styles';

export default function Card(): JSX.Element {
  return (
    <S.CardWrap>
      <S.UserWrap>
        <S.UserImg
          src={process.env.PUBLIC_URL + '/images/profile.png'}
          alt=""
        />
        <S.UserName>하찌킹</S.UserName>
      </S.UserWrap>
      <S.ImgWrap>
        <img src={process.env.PUBLIC_URL + '/images/hazzi.jpg'} alt="" />
      </S.ImgWrap>
      <S.CardContentWrap>
        <S.ContentTop>
          {/* <i className="ri-heart-3-line icolor"></i> */}
          <div>
            <i className="ri-heart-3-fill hearticon"></i>
            <i className="ri-mail-line chaticon"></i>
            {/* <S.IconWrap>
              <i className="ri-send-plane-2-line chaticon"></i>
            </S.IconWrap> */}
          </div>
          <span>3 일전</span>
        </S.ContentTop>
        <S.Content>👛👛👛👛 설날</S.Content>
        <S.CommentWrap>
          <S.CommentCount>댓글 422개</S.CommentCount>
          <S.Comment>
            <span>hwisu</span>너무 귀여워요~~
          </S.Comment>
        </S.CommentWrap>
      </S.CardContentWrap>
    </S.CardWrap>
  );
}
