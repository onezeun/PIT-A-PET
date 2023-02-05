import React from 'react';
import * as S from './Modal.styles';

export interface ModalStyle {
  headColor?: string;
  headTitleColor?: string;
  headCloseBtn?: string;
  saveBtnColor?: string;
  saveBtnFont? : string;
}

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ModalStyle {
  modalOpen: boolean | null;
  modalClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
  header: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ modalOpen, modalClose, header, children, className, ...rest }: IProps): JSX.Element {
  return (
    <S.ModalWrap>
      <div className={modalOpen ? 'openModal modal' : 'modal'}>
        {modalOpen ? (
          <S.Modal className={className} {...rest}>
            <S.ModalHeader >
              <span>{header}</span>
              <i className="ri-close-fill close" onClick={modalClose}></i>
            </S.ModalHeader>
            <S.ModalContent>{children}</S.ModalContent>
          </S.Modal>
        ) : null}
      </div>
    </S.ModalWrap>
  );
}
