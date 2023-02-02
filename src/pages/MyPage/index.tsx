import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MyPage.styles';

import AllContainer from 'components/AllContainer';
import Modal from 'components/Modal';
import AddPet from './AddPet';

export default function MyPage(): JSX.Element {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState('');
  const userImgUpload = useRef<any>();

  const userImgChange = () => {
    const file = userImgUpload.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserImg(reader.result as string);
    };
  };

  const deleteUserImg = () => {
    setUserImg('');
  }

  // 모달창
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const modalClose = () => {
    setModalOpen(false);
  };

  // 슬라이드
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '150px',
    slidesToShow: 1,
    speed: 500,
  };

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
          <input
            type="file"
            className="imgInput"
            id="imgInput"
            onChange={userImgChange}
            ref={userImgUpload}
          ></input>
          <label htmlFor="imgInput" className="imgLabel">
            회원 프로필사진 업로드
          </label>
          <S.UserImgWrap>
            <img src={userImg ? userImg : process.env.PUBLIC_URL + '/images/profile.png'} />
            <S.MyPageBtn onClick={() => userImgUpload.current.click()}>이미지업로드</S.MyPageBtn>
            <S.MyPageBtn onClick={deleteUserImg}>이미지제거</S.MyPageBtn>
          </S.UserImgWrap>
          <S.UserInfo>
            <p>
              아이디<span>onezeun</span>
            </p>
            <p>
              닉네임<span>하찌킹</span>
            </p>
          </S.UserInfo>
          <S.MyPageBtn>비밀번호 변경</S.MyPageBtn>
        </S.UserWrap>
        <S.PetWrap>
          <S.PetTitleWrap>
            <h1>반려동물리스트</h1>
            <S.MyPageBtn onClick={openModal}>추가</S.MyPageBtn>
          </S.PetTitleWrap>
          <Modal
            modalOpen={modalOpen}
            modalClose={modalClose}
            header="반려동물추가등록"
          >
            <AddPet />
          </Modal>
          <S.PetImgSlider {...settings}>
            <S.SliderItem>
              <S.SliderContent>
                <img src={process.env.PUBLIC_URL + '/images/pet_default_img.png'} />
                <p>반려동물 이름1</p>
              </S.SliderContent>
            </S.SliderItem>
            <S.SliderItem>
              <S.SliderContent>
                <img src={process.env.PUBLIC_URL + '/images/pet_default_img.png'} />
                <p>반려동물 이름2</p>
              </S.SliderContent>
            </S.SliderItem>
            <S.SliderItem>
              <S.SliderContent>
                <img src={process.env.PUBLIC_URL + '/images/pet_default_img.png'} />
                <p>반려동물 이름3</p>
              </S.SliderContent>
            </S.SliderItem>
            <S.SliderItem>
              <S.SliderContent>
                <img src={process.env.PUBLIC_URL + '/images/pet_default_img.png'} />
                <p>반려동물 이름4</p>
              </S.SliderContent>
            </S.SliderItem>
          </S.PetImgSlider>
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
        <S.MyPageBtn>저장하기</S.MyPageBtn>
      </S.MyPageWrap>
    </AllContainer>
  );
}
