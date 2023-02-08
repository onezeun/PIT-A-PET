import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

import { getUser } from 'store/modules/user.slice';

import AllContainer from 'components/AllContainer';
import * as S from './Chat.styles';
import Button from 'components/Button';
import { getChatRoom } from 'store/modules/chat.slice';

export default function Chat() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [otherUid, setOtherUid] = useState('');
  const [otherUser, setOtherUser] = useState<string[]>([]);

  let user = useSelector((state: RootState) => state.auth.sessionData) as any;
  let currentUid = user.uid;

  useEffect(() => {
    if (user !== undefined) {
      chatRoomData();
    }
  },[]);

  const chatRoomData = () => {
    dispatch(getChatRoom(currentUid))
      .then((data: any) => {
        data.payload.forEach((a: any) => {
          let arr = a.uid;
          let filter = arr.filter((el: string) => el != currentUid)
          setOtherUid(...[filter] as const)
          dispatch(getUser(otherUid))
          .then((data: any) => {
            let copy = [...otherUser];
            copy.push(data.payload)
            setOtherUser(copy);
          })
        })
      })
      console.log(otherUser);
  }

  // const otherUserData = () => {
  //   dispatch(getUser(uid))
  //     .then((data: any) => {
  //       setOtherUser(data.payload.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <AllContainer>
      <S.ChatWrap>
      <S.ChatListItem onClick={()=> navigate('/chatroom') }>
          <S.OtherInfo>
            <S.OtherImg
              src={process.env.PUBLIC_URL + '/images/profile.png'}
            ></S.OtherImg>
            <S.OtherName>상대방</S.OtherName>
            <S.LastMessage>마지막 메세지</S.LastMessage>
          </S.OtherInfo>
          <Button
            width="60px"
            height="30px"
            fontSize="0.9rem"
            buttonColor="BLUE_100"
            fontColor="WHITE"
          >
            나가기
          </Button>
        </S.ChatListItem>
        <S.ChatListItem>
          <S.OtherInfo>
            <S.OtherImg
              src={process.env.PUBLIC_URL + '/images/profile.png'}
            ></S.OtherImg>
            <S.OtherName>상대방</S.OtherName>
            <S.LastMessage>마지막 메세지</S.LastMessage>
          </S.OtherInfo>
          <Button
            width="60px"
            height="30px"
            fontSize="0.9rem"
            buttonColor="BLUE_100"
            fontColor="WHITE"
          >
            나가기
          </Button>
        </S.ChatListItem>
        
      </S.ChatWrap>
    </AllContainer>
  );
}
