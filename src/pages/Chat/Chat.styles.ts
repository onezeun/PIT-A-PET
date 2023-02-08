import styled from 'styled-components/macro';
interface ChatStyle {
  border?: string;
}

export const ChatWrap = styled.div`
  margin: auto;
  width: 100vw;
  max-width: 500px;

  @media screen and (min-width: 501px) {
    height: 80vh;
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.GREY};
    border: none;
    border-radius: 5px;
    width: 100vw;
`;

export const ChatListItem = styled.div<ChatStyle>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  border-top: ${(props) =>
    props.border || '1px solid' + props.theme.colors.GREY};
  transition: 0.3s ease;
  cursor: pointer;
  &:hover,
  :active {
    background: ${(props) => props.theme.colors.YELLOW_200};
  }
`;
export const OtherInfo = styled.div`
  display: flex;
  align-items: center;
  justifycontent: left;
`;

export const OtherImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const OtherName = styled.span`
  margin-left: 20px;
  width: 80px;
`;

export const LastMessage = styled.span`
  color: ${(props) => props.theme.colors.GREY_100};
`;

// chatroom
export const ChatRoomOtherInfoWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.YELLOW};
  background: ${(props) => props.theme.colors.YELLOW_200};

  & i {
    font-size: 2rem;
    margin-right: 10px;
    color: ${(props) => props.theme.colors.GREY_200};
  }
`;

export const BackBtnWrap = styled.div`
  cursor: pointer;
  & i {
    font-size: 2rem;
    margin-right: 15px;
    color: ${(props) => props.theme.colors.GREY_200};
  }
`;
export const MessageBox = styled.div`
  padding: 15px 30px;

  @media screen and (min-width: 501px) {
    height: 75vh;
  };
`;

export const MagWrap = styled.div`
  display: flex;
  margin: 10px 0;
  
  &.otherWrap {
    flex-direction: row;
  }

  &.currentUserWrap {
    flex-direction: row-reverse;
  }
`;

export const Massage = styled.div`
  display: inline-block;
  width: auto;
  height: auto;
  min-height: 30px;
  border-radius: 5px;
  overflow: auto;
  padding: 10px;

  &.other {
    background: ${(props) => props.theme.colors.BLUE};
    color: ${(props) => props.theme.colors.WHITE};
  }

  &.currentUser {
    background: ${(props) => props.theme.colors.YELLOW_200};
    color: ${(props) => props.theme.colors.GREY_200};
  }
`;

export const MsgInputWrap = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
`;

export const MsgInput = styled.input`
  padding: 0 10px;
  width: 100%;
  height: 50px;
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.GREY};
  border-left: 1px solid ${(props) => props.theme.colors.GREY};

}
`;

export const SendBtn = styled.button`
  width: 100px;
  border-top: 1px solid ${(props) => props.theme.colors.BLUE};
  background: ${(props) => props.theme.colors.BLUE};
  color: ${(props) => props.theme.colors.WHITE};
`;
