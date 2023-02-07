import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getUser, updateUser } from 'store/modules/user.slice';
import { getPet } from 'store/modules/pet.slice';
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
  userImg: string;

  isPet: boolean | null;
}

interface IPetInfo {
  id: string;
  uid: string;
  petImg: any | null;
  petName: string | null;
  petType: string | null;
  petAge: string | null;
  petGender: string | null;
}


export default function MyPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [id, setId] = useState('');
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  const [petsData, setPetsData] = useState<IPetInfo[] | null>(null);
  const [selectPetData, setSelectPetData] = useState<IPetInfo | null>(null);
  const [userImg, setUserImg] = useState<File | null>(null);
  const [userImgUrl, setUserImgUrl] = useState('');
  const userImgUpload = useRef<any>();

  let user = useSelector((state: RootState) => state.auth.sessionData) as any;
  const uid = user.uid;

  useEffect(() => {
    if (userData !== undefined) {
      fetchData();
    }
    if (petsData !== undefined) {
      fetchPetData();
    }
    if (userImg != null) {
      updateProfile();
    }
  }, [userImg])

  // 유저 정보 가져오기
  const fetchData = () => {
    dispatch(getUser(uid))
      .then((data: any) => {
        setUserData(data.payload.data);
        setId(data.payload.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchPetData = () => {
    dispatch(getPet(uid))
      .then((data: any) => {
        if (data.payload.length == 0) {
          setPetsData(null);
          console.log('펫없음')
        } else {
          setPetsData(data.payload);
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateProfile = () => {
    if(userImg != null) {
      dispatch(updateUser({id, uid, userImg}))
      .then((data: any) => {
        console.log(data);
      })
      .catch((err) => {
  
      });
    }
  };

  // 이미지 미리보기
  const userImgChange = () => {
    const file = userImgUpload.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserImgUrl(reader.result as string);
    };
    setUserImg(file);
  };

  const deleteUserImg = () => {
    setUserImgUrl('');
  }

  // 모달창
  const [addPetModal, setAddPetModal] = useState(false);
  const [updatePetModal, setUpdatePetModal] = useState(false);

  const openAddPet = () => {
    setAddPetModal(true);
  };

  const modalClose = () => {
    setAddPetModal(false);
    setUpdatePetModal(false);
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
            {userImgUrl != '' ? (
              <img src={userImgUrl ? userImgUrl : process.env.PUBLIC_URL + '/images/profile.png'} />
            ) : (
              <img src={userData && userData.userImg ? userData.userImg : process.env.PUBLIC_URL + '/images/profile.png'} />
            )}
            <S.MyPageBtn onClick={() => userImgUpload.current.click()}>이미지업로드</S.MyPageBtn>
            <S.MyPageBtn onClick={deleteUserImg}>이미지제거</S.MyPageBtn>
          </S.UserImgWrap>
          <S.UserInfo>
            <p>
              이메일<span>{userData ? userData.email : null}</span>
            </p>
            <p>
              이름<span style={{ marginLeft: '55px' }}>{userData ? userData.userName : null}</span>
            </p>
          </S.UserInfo>
          <S.MyPageBtn>비밀번호 변경</S.MyPageBtn>
        </S.UserWrap>
        <S.PetWrap>
          <S.PetTitleWrap>
            <h1>반려동물리스트</h1>
            <S.MyPageBtn onClick={openAddPet}>추가</S.MyPageBtn>
          </S.PetTitleWrap>
          <Modal
            modalOpen={addPetModal ? true : null}
            modalClose={modalClose}
            header="반려동물추가등록"
          >
            <AddPet uid={uid} modalClose={modalClose} />
          </Modal>
          {petsData == null ? (
            <p>반려동물을 등록해보세요~~</p>
          ) : (
            <S.PetImgSlider {...settings}>
              {petsData.map((pet, i: number): JSX.Element => {
                return (
                  <S.SliderItem key={i}>
                    <S.SliderContent>
                      <img src={process.env.PUBLIC_URL + `${pet.petImg}`} />
                      <p>{pet.petName}</p>
                    </S.SliderContent>
                    <S.PetInfo>
                      <S.MyPageBtn onClick={() => {
                        setUpdatePetModal(true);
                        setSelectPetData(pet);
                      }}>반려동물정보수정</S.MyPageBtn>
                      <p>
                        이름<span>{pet.petName}</span>
                      </p>
                      <p>
                        나이<span>{pet.petAge}</span>
                      </p>
                      <p>
                        성별<span>{pet.petGender}</span>
                      </p>
                    </S.PetInfo>
                  </S.SliderItem>
                )
              })}
            </S.PetImgSlider>
          )}
          <Modal
            modalOpen={updatePetModal ? true : false}
            modalClose={modalClose}
            header="반려동물정보수정"
          >
            <UpdatePet selectPetData={selectPetData} uid={uid} modalClose={modalClose} />
          </Modal>
        </S.PetWrap>
      </S.MyPageWrap>
    </AllContainer>
  );
}
