import React from 'react';
import { useNavigate } from 'react-router-dom';
import AllContainer from 'components/AllContainer';
import * as S from './Chat.styles';

export default function ChatRoom(): JSX.Element {
  const navigate = useNavigate();
  return (
    <AllContainer>
      <S.ChatWrap>
        <S.ChatRoomOtherInfoWrap>
          <S.BackBtnWrap onClick={() => navigate(-1)}>
            <i className="ri-arrow-left-s-line"></i>
          </S.BackBtnWrap>
          <S.OtherInfo>
            <S.OtherImg
              src={process.env.PUBLIC_URL + '/images/profile.png'}
            ></S.OtherImg>
            <S.OtherName>상대방</S.OtherName>
          </S.OtherInfo>
        </S.ChatRoomOtherInfoWrap>
        <S.MessageBox>
          <S.MagWrap className="otherWrap">
            <S.Massage className="other">
              <span>안뇽</span>
            </S.Massage>
          </S.MagWrap>
          <S.MagWrap className="currentUserWrap">
            <S.Massage className="currentUser">
              <span>길게 쓰면 그대로 늘어나나?</span>
            </S.Massage>
          </S.MagWrap>
        </S.MessageBox>
        <S.MsgInputWrap>
          <S.MsgInput
            type="text"
            placeholder="메세지를 입력하세요"
          ></S.MsgInput>
          <S.SendBtn>전송</S.SendBtn>
        </S.MsgInputWrap>
      </S.ChatWrap>
    </AllContainer>
  );
}
