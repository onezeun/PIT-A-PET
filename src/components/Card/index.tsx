import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getUser } from 'store/modules/user.slice';
import { createChatRoom } from 'store/modules/chat.slice';
import * as S from './Card.styles';

import Button from 'components/Button';

interface IUserInfo {
  uid: string;
  email: string;
  userName: string;
  userImg: string;
}

interface IPostInfo {
  id: string;
  uid: string;
  userName: string;
  postContent: string;
  postImg: File;
  postDate: Date;
}

interface IProps {
  postData: IPostInfo
}

export default function Card({ postData }: IProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<IUserInfo | null>(null);
  let user = useSelector((state: RootState) => state.auth.sessionData) as any;

  useEffect(() => {
    if (userData !== undefined) {
      fetchData();
    }
  }, [])

  const fetchData = () => {
    dispatch(getUser(postData.uid))
      .then((data: any) => {
        setUserData(data.payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const createChat = () => {
    const uid = user.uid;
    const userName = user.displayName;
    const postUid = postData.uid;
    const postUserName = postData.userName
    // const postUserName = postData.userName
    dispatch(createChatRoom({ uid: [uid, postUid], userName: [userName, postUserName] }))
      .then(() => {
        navigate('/chat')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getDate = (getdate: any) => {
    let today = getdate.toDate()
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분

    return {
      day : year +'.'+ month + '.' + date,
      time: hours + ':' + minutes
    }
  }


  return (
    <S.CardWrap>
      <S.UserWrap>
        <S.UserInfo>
          <S.UserImg
            src={process.env.PUBLIC_URL + userData?.userImg}
            alt="프로필이미지"
          />
          <S.UserName>{userData?.userName}</S.UserName>
        </S.UserInfo>
        {user && user.uid == userData?.uid ? (
          <S.UserBtn>
            <Button width='50px' height='30px' buttonColor='BLUE' fontColor='WHITE' margin='0 10px 0 0'>수정</Button>
            <Button width='50px' height='30px' buttonColor='GREY' >삭제</Button>
          </S.UserBtn>
        ) : null}
      </S.UserWrap>
      <S.ImgWrap>
        <img src={process.env.PUBLIC_URL + postData.postImg} alt="게시글이미지" />
      </S.ImgWrap>
      <S.CardContentWrap>
        <S.ContentTop>
          <div>
            <i className="ri-heart-3-line hearticon"></i>
            <i className="ri-mail-line chaticon" onClick={createChat}></i>
            {/* <S.IconWrap>
              <i className="ri-send-plane-2-line chaticon"></i>
            </S.IconWrap> */}
          </div>
          <span>{getDate(postData.postDate).day}</span>
        </S.ContentTop>
        {/* <S.CardTagWrap>
          <S.CardTag>#강아지</S.CardTag>
          <S.CardTag>#포메</S.CardTag>
          <S.CardTag>#8살</S.CardTag>
          <S.CardTag>#초코콘요리사</S.CardTag>
        </S.CardTagWrap> */}
        <S.Content>{postData.postContent}</S.Content>
        <div>
          <S.CommentCount>댓글 422개</S.CommentCount>
          <S.Comment>
            <span>onezeun</span>너무 귀여워요~~
          </S.Comment>
        </div>
      </S.CardContentWrap>
    </S.CardWrap>
  );
}
