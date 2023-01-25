import React, { useEffect, useRef } from 'react';
import * as S from './Register.styles';
import profile from '../../assets/images/profile.png'

export default function PetInfo(): JSX.Element {
  const uploadImg = useRef<any>('');
  return (
    <S.PetInfoBox>
      <p>
        회원가입시에는 1마리만 입력 가능합니다.
        <br />
        가입 후 회원정보에서 추가 등록이 가능합니다.
        <br />
        구글계정으로 가입하시는 경우
        <br />
        가입 후 회원정보에서 수정해주세요.
      </p>
      <input type="file" className="imgInput" id="imgInput" ref={uploadImg}></input>
      <label htmlFor="imgInput" className='imgLabel'>반려동물 이미지 업로드</label>
      <S.PetImg
        src={profile}
        id="petImg"
        alt="프로필 이미지"
      />
      <S.ImgBtn onClick={() => uploadImg.current.click()}>
        이미지 업로드
      </S.ImgBtn>
      <S.InputWrap>
        <S.SubTitle htmlFor="petName" className="subTitle">
          반려동물 이름
        </S.SubTitle>
        <S.RegisterInput type="text" id="petName" className="registerInput"></S.RegisterInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petType" className="subTitle">
          종류
        </S.SubTitle>
        <S.RegisterInput type="text" id="petType" className="registerInput"></S.RegisterInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petAge" className="subTitle">
          나이
        </S.SubTitle>
        <S.RegisterInput type="text" id="petAge" className="registerInput"></S.RegisterInput>
      </S.InputWrap>

      <S.InputWrap>
        <S.SubTitle htmlFor="petGender" className="subTitle">
          성별
        </S.SubTitle>
        <S.RegisterInput type="text" id="petGender" className="registerInput"></S.RegisterInput>
      </S.InputWrap>
    </S.PetInfoBox>
  );
}
