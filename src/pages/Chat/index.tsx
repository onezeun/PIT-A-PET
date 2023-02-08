import React from 'react';
import { useNavigate } from 'react-router-dom';

import ChatRoom from './ChatRoom';
import AllContainer from 'components/AllContainer';
import * as S from './Chat.styles';
import Button from 'components/Button';

export default function Chat() {
  const navigate = useNavigate();
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
