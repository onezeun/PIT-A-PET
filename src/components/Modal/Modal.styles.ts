import styled, { css } from 'styled-components/macro';
import { ModalStyle } from './index';

export const ModalWrap = styled.div`
  & .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  & .openModal {
    display: flex;
    align-items: center;
    animation: modal-bg-show 0.3s;
  }

  & .modal button {
    outline: none;
    cursor: pointer;
    border: 0;
  }

  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  padding: 20px 20px 15px 20px;

  & .close {
    font-size: 1.5rem;
    text-align: center;
    cursor: pointer;
  }

  & span {
    font-size: 1.2rem;
  }
`;

export const ModalContent = styled.div`
  padding: 16px;
  border-top: 1px solid #dee2e6;
`;

// export const ModalSaveBtn = styled.button`
//   width: 50%;
//   height: 40px;
//   margin: 30px 0 20px 0;
//   color: white;
//   background-color: ${(props) => props.theme.colors.BLUE};
//   border-radius: 5px;
//   font-size: 1rem;
// `;

export const Modal = styled.section<ModalStyle>`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;

  animation: modal-show 0.3s;
  overflow: hidden;

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  ${ModalHeader} {
    ${({ headColor = 'YELLOW' }) => css`
      background-color: ${(props) => props.theme.colors[headColor]};
    `}
    & .close {
      ${({ headCloseBtn = 'BLUE' }) => css`
        color: ${(props) => props.theme.colors[headCloseBtn]};
      `}
    }
    & span {
      ${({ headTitleColor = 'BLUE' }) => css`
        color: ${(props) => props.theme.colors[headTitleColor]};
      `}
    }
  }
`;
