import styled, { css } from 'styled-components/macro';

export const MyPageWrap = styled.div`
  text-align: center;

  & h1 {
    text-align: center;
    color: ${(props) => props.theme.colors.BLUE};
    font-family: 'IM_Hyemin-Bold';
    font-size: 25px;
    margin-bottom: 10px;
  }

  ${({ theme: { media } }) => css`
  @media screen and ${media.tablet} {
    & h1 {
      text-align: left;
    }
  }

  @media screen and ${media.desktop} {
    & h1 {
      text-align: left;
    }
  }
`}
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

  ${({ theme: { media } }) => css`
    @media screen and ${media.tablet} {
      flex-direction: row;
      & img {
        width: 60px;
        height: 60px;
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

export const PetCheck = styled.div`
  margin: 30px auto;
  max-width: 300px;

  & p {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & input[type='radio'] {
    display: none;
  }

  & label {
    display: inline-block;
    width: 48%;
    height: 35px;
    line-height: 35px;
    margin: 15px 1% 0;
    background: ${(props) => props.theme.colors.YELLOW_100};
    border-radius: 5px;
    color: ${(props) => props.theme.colors.GREY_200};
    cursor:pointer;
  }
`;

export const PetWrap = styled.div`
  margin-top: 50px;
`;

export const PetTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme: { media } }) => css`
    @media screen and ${media.tablet} {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    @media screen and ${media.desktop} {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
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

  ${({ theme: { media } }) => css`
    @media screen and ${media.tablet} {
      flex-direction: row;
    }

    @media screen and ${media.desktop} {
      flex-direction: row;
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

export const MyPageBtn = styled.button`
  border-radius: 5px;
  margin: 5px 0;
  width: 70%;
  height: 40px;

  ${({ theme: { media } }) => css`
    @media screen and ${media.tablet} {
      width: 130px;
      margin: 5px 5px;
    }

    @media screen and ${media.desktop} {
      width: 130px;
      margin: 0 5px;
    }
  `}
`;

export const AddPet = styled.div`
  margin: auto;
  max-width: 300px;

  & p {
    font-size: 0.9rem;
    padding: 10px;
    color: ${(props) => props.theme.colors.GREY_100};
    text-align: left;
    line-height: 25px;
    margin: 10px 0;
    background: rgba(255, 236, 172, 0.6);
    border-radius: 5px;
  }

  & .imgInput,
  .imgLabel {
    display: none;
  }
`;

export const AddPetImg = styled.img`
  width: 120px;
  height: auto;
  margin 10px 0;
`;

export const AddPetImgBtn = styled.div`
  display: block;
  width: 150px;
  height: 30px;
  line-height: 30px;
  margin: auto;
  font-size: 0.9rem;
  background: ${(props) => props.theme.colors.YELLOW_100};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.GREY_200};
  cursor: pointer;
`;

export const InputWrap = styled.div`
  width: 300px;
  text-align: left;
  margin: 20px auto 0;
`;

export const SubTitle = styled.label`
  color: ${(props) => props.theme.colors.BLUE};
`;

export const addPetInput = styled.input`
  color: ${(props) => props.color || props.theme.colors.BLUE};
  margin: 5px auto 0;
  padding: 10px;
  width: 300px;
  height: 40px;
  display: block;
  border: 1px solid ${(props) => props.color || props.theme.colors.BLUE};
  border-radius: 5px;
`;
