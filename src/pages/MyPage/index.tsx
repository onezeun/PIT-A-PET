import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getUser, updateUser } from 'store/User/user.slice';
import { apiKey } from '../../Firebase';
import * as S from './MyPage.styles';

import AllContainer from 'components/AllContainer';
import Modal from 'components/Modal';
import AddPet from './AddPet';
import UpdatePet from './UpdatePet';

interface IUserInfo {
  uid: string;
  email: string;
  userName: string;

  isPet: boolean | null;
}

export default function MyPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [uid, setUid] = useState('');
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [userImg, setUserImg] = useState('');
  const userImgUpload = useRef<any>();

  // 유저 정보 가져오기
  const fetchData = () => {
    const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
    const user = JSON.parse(sessionStorage.getItem(session_key)!);
    const userId = user.uid
    setUid(user.uid)
    dispatch(getUser(userId))
      .then((data: any) => {
        setUserData(data.payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (userData !== undefined) {
      fetchData();
    }
  }, [])

  // 이미지 미리보기
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const file = userImgUpload.current.files[0];
    // dispatch(updateUser({}))
      // .then((data: any) => {
      //   console.log(data)
      // })
      // .catch((err) => {

      // });
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
              이메일<span>{userData ? userData.email : null}</span>
            </p>
            <p>
              이름<span style={{marginLeft: '55px'}}>{userData ? userData.userName : null}</span>
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
            <AddPet uid={uid} modalClose={modalClose}/>
          </Modal>
          <S.PetImgSlider {...settings}>
            <S.SliderItem>
              <S.SliderContent>
                <img src={process.env.PUBLIC_URL + '/images/pet_default_img.png'} />
                <p>반려동물 이름1</p>
              </S.SliderContent>
              <Modal
                modalOpen={modalOpen}
                modalClose={modalClose}
                header="반려동물정보수정"
              >
                <UpdatePet uid={uid} modalClose={modalClose} />
              </Modal>
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
        <S.MyPageBtn onClick={handleSubmit}>저장하기</S.MyPageBtn>
      </S.MyPageWrap>
    </AllContainer>
  );
}
