import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addMessage, getMessage } from 'store/modules/chat.slice';

import * as S from './Chat.styles';

export default function ChatRoom(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let { id } = useParams() as { id: string };
  let { name } = useParams() as { name: string };
  let user = useSelector((state: RootState) => state.auth.sessionData) as any;
  let uid = user.uid;
  let date = new Date();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [allMessage, setAllMessage] = useState<any | null>(null);
  const [message, setMessage] = useState<string>('');
  const [render, setRender] = useState('');

  useEffect(() => {
    fetchData();
    if (scrollRef.current != null) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [render]);
  
  // 메세지 불러오기
  const fetchData = () => {
    dispatch(getMessage(id))
      .then((data) => {
        setAllMessage(data.payload)
      })
  }

  // 메세지 전송 및 데이터 저장
  const messageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message == '') {
      return false;
    } else {
      dispatch(addMessage({ id, message, date, uid })).then(() => {
        setRender(message);
      });
    }
    setMessage('');
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      sendMessage();
      setMessage('');
    }
  };

  return (
    <S.ChatRoomContainer>
      <S.ChatWrap>
        <S.ChatRoomOtherInfoWrap>
          <S.BackBtnWrap onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-s-line"></i>
          </S.BackBtnWrap>
          <S.OtherInfo>
            <S.OtherImg
              src={process.env.PUBLIC_URL + '/images/profile.png'}
            ></S.OtherImg>
            <S.OtherName>{name}</S.OtherName>
          </S.OtherInfo>
        </S.ChatRoomOtherInfoWrap>
        <S.MessageBox>
          {allMessage &&
            allMessage.map((data: any, i: number) => {
              return (
                <S.MagWrap
                  className={data.uid == uid ? 'currentUserWrap' : 'otherWrap'}
                  key={i}
                >
                  <S.Massage
                    className={data.uid == uid ? 'currentUser' : 'other'}
                  >
                    <span>{data.message}</span>
                  </S.Massage>
                </S.MagWrap>
              );
            })}
            <div ref={scrollRef}></div>
        </S.MessageBox>
        <S.MsgInputWrap>
          <S.MsgInput
            type="text"
            placeholder="메세지를 입력하세요"
            onChange={messageChange}
            onKeyDown={handleKeyPress}
            value={message}
          ></S.MsgInput>
          <S.SendBtn onClick={sendMessage}>
            전송
          </S.SendBtn>
        </S.MsgInputWrap>
      </S.ChatWrap>
    </S.ChatRoomContainer>
  );
}
