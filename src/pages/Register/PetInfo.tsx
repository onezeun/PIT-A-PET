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
      <img
        src={profile}
        id="petImg"
        className="petImg"
        alt="프로필 이미지"
      />
      <button className="imgBtn" onClick={() => uploadImg.current.click()}>
        이미지 업로드
      </button>
      <div className="inputWrap">
        <label htmlFor="petName" className="subTitle">
          반려동물 이름
        </label>
        <input type="text" id="petName" className="registerInput"></input>
      </div>

      <div className="inputWrap">
        <label htmlFor="petType" className="subTitle">
          종류
        </label>
        <input type="text" id="petType" className="registerInput"></input>
      </div>

      <div className="inputWrap">
        <label htmlFor="petAge" className="subTitle">
          나이
        </label>
        <input type="text" id="petAge" className="registerInput"></input>
      </div>

      <div className="inputWrap">
        <label htmlFor="petGender" className="subTitle">
          성별
        </label>
        <input type="text" id="petGender" className="registerInput"></input>
      </div>
    </S.PetInfoBox>
  );
}
