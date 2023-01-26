import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MyPage.styles';

import AllContainer from 'components/AllContainer';

export default function MyPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <AllContainer>
      <S.MyPageWrap>
        <S.LogoImg
          src={process.env.PUBLIC_URL + '/images/b_chr.png'}
          alt="로고"
          onClick={() => {
            navigate('/');
          }}
        />
        <h1>회원정보수정</h1>
        <S.UserWrap>
          <S.UserImgWrap>
            <img src={process.env.PUBLIC_URL + '/images/profile.png'} />
            <button>이미지업로드</button>
            <button>이미지제거</button>
          </S.UserImgWrap>
          <S.UserInfo>
            <p>
              아이디<span>onezeun</span>
            </p>
            <p>
              닉네임<span>하찌킹</span>
            </p>
          </S.UserInfo>
          <S.PwdBtn>비밀번호 변경</S.PwdBtn>
        </S.UserWrap>
        <S.PetWrap>
          <S.PetTitleWrap>
            <h1>반려동물리스트</h1>
            <button>등록하기</button>
          </S.PetTitleWrap>
          <S.PetImgWrap>
            <img src={process.env.PUBLIC_URL + '/images/profile.png'} />
            <img src={process.env.PUBLIC_URL + '/images/profile.png'} />
            <img src={process.env.PUBLIC_URL + '/images/profile.png'} />
            <p>반려동물 이름~ 슬라이드 넣을예정</p>
          </S.PetImgWrap>
          <S.PetImgBtnWrap>
            <button>이미지업로드</button>
            <button>이미지제거</button>
          </S.PetImgBtnWrap>
          <S.PetInfo>
            <p>
              이름<span>하찌</span>
            </p>
            <p>
              나이<span>8 세</span>
            </p>
            <p>
              성별<span>남</span>
            </p>
          </S.PetInfo>
        </S.PetWrap>
        <S.SaveBtn>저장하기</S.SaveBtn>
      </S.MyPageWrap>
    </AllContainer>
  );
}
