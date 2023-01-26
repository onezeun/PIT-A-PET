import styled, { css } from 'styled-components/macro';

export const MyPageWrap = styled.div`
  text-align: center;

  & h1 {
    text-align: left;
    color: ${(props) => props.theme.colors.BLUE};
    font-family: 'IM_Hyemin-Bold';
    font-size: 25px;
  }
`;

export const LogoImg = styled.img`
  width: 100px;
  height: auto;
  margin: -50px auto 30px;
  cursor: pointer;
`;

export const UserWrap = styled.div`
  margin: 20px auto;
  padding: 10px;
`;

export const UserImgWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  & img {
    width: 100px;
    height: 100px;
    margin: 5px 0;
    border-radius: 50%;
  }

  & button {
    border-radius: 5px;
    margin: 5px 0;
    width: 130px;
    height: 35px;
  }

  ${({ theme: { media } }) => css`
    @media screen and ${media.tablet} {
      flex-direction: row;
      & img {
        width: 60px;
        height: 60px;
        margin: 0 5px;
      }
      & button {
        margin: 0 5px;
      }
    }

    @media screen and ${media.desktop} {
      flex-direction: row;
      & img {
        width: 60px;
        height: 60px;
        margin: 0 5px;
      }
      & button {
        margin: 0 5px;
      }
    }
  `}
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 20px auto;
  text-align: left;
  line-height: 40px;

  & p {
    font-size: 1.1rem;
    font-weight: bold;
  }

  & span {
    font-weight: 100;
    margin-left: 40px;
  }
`;

export const PwdBtn = styled.button`
  text-align: center;
  border-radius: 5px;
  width: 130px;
  height: 35px;
`;

export const PetWrap = styled.div`
  margin-top: 50px;
`;

export const PetTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & button {
    margin: 10px 0;
    border-radius: 5px;
    width: 130px;
    height: 35px;
  }

  ${({ theme: { media } }) => css`
    @media screen and ${media.tablet} {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & button {
        margin: 0;
      }
    }

    @media screen and ${media.desktop} {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & button {
        margin: 0;
      }
    }
  `}
`;

export const PetImgWrap = styled.div`
  margin: 30px 0;
  & img {
    width: 100px;
    height: 100px;
    margin: 5px 0;
    border-radius: 50%;
  }
`;

export const PetImgBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & button {
    border-radius: 5px;
    margin: 5px 0;
    width: 130px;
    height: 35px;
  }
  ${({ theme: { media } }) => css`
    @media screen and ${media.tablet} {
      flex-direction: row;
      & button {
        margin: 0 5px;
      }
    }

    @media screen and ${media.desktop} {
      flex-direction: row;
      & button {
        margin: 0 5px;
      }
    }
  `}
`;

export const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 20px auto;
  text-align: left;
  line-height: 40px;

  & p {
    font-size: 1.1rem;
    font-weight: bold;
  }

  & span {
    font-weight: 100;
    margin-left: 40px;
  }
`;

export const SaveBtn = styled.button`
  border-radius: 5px;
  margin: 5px 0;
  width: 130px;
  height: 35px;
`;
