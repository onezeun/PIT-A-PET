import styled, { css } from 'styled-components/macro';

export const EditTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const EditTitleWrap = styled.div`
  display: flex;
  align-items: center;

  & i {
    font-size: 30px;
  }

  & p {
    margin-left: 5px;
    font-size: 1.1rem;
  }
`;

export const EditTopButtonWrap = styled.div`
  & .imgInput {
    display: none;
  }
  
  & button {
    padding: 0 20px;
    color: ${(props) => props.theme.colors.WHITE};
    background: ${(props) => props.theme.colors.BLUE};
    border-radius: 5px;
    height: 35px;
    margin-left: 10px;
  }
`;

export const EditContent = styled.textarea`
  min-height: 200px;
  font-family: 'Pretendard-Regular';
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  resize: none;
`;

export const ImgUpload = styled.div``;

export const ThumnailImg = styled.div`
  margin-top: 10px;
  background: #ccc;
  text-align: center;
  width: 100%;
  min-height: 250px;
  border-radius: 5px;
`;

export const SubmitBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 40px;
  font-size: 1.1rem;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.WHITE};
  background: ${(props) => props.theme.colors.BLUE};
`;
