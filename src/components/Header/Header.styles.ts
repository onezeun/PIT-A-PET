import styled, { css } from 'styled-components/macro';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  aline-items: center;
  justify-content: space-between;
  width: 100vw;
  max-width: 1200px;
  margin: auto;
  height: 100px;
  padding: 20px;
  line-height: 50px;
  z-index: 100;
  background:  ${(props) => props.theme.colors.WHITE};
`;

export const LogoWrap = styled.div`
  vertical-align: center;
  height: 40px;
  cursor: pointer;

  & img {
    width: 176px;
    height: 40px;
  }
`;

export const GNB = styled.div`
  & .icolor {
    color: ${(props) => props.theme.colors.BLUE};
    margin-left: 10px;
    font-size: 35px;
    cursor: pointer;
  }
`;

export const SideBarWrap = styled.div`
  line-height: 50px;
  display: block;
  z-index: 10;
  padding: 12px;
  border: 1px soild ${(props) => props.theme.colors.GREY};
  box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.GREY};
  border-radius: 15px 0 0 15px;
  background-color: ${(props) => props.theme.colors.YELLOW};
  height: 100%;
  width: 50vw;
  right: -60%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;
  font-size: 1.2rem;

  & .icolor {
    color: ${(props) => props.theme.colors.BLUE};
    margin-left: 0;
    font-size: 40px;
  }

  &.open {
    right: 0;
    transition: 0.5s ease;
  }

  ${({ theme: { media } }) => css`
    @media screen and ${media.tablet} {
      right: 0;
      width: 200px;
      & .icolor {
        display: none;
      }
    }

    @media screen and ${media.desktop} {
      width: 300px;
      & .icolor {
        right: 0;
        display: none;
      }
    }
  `}
`;

export const ListItem = styled.li`
  margin: 0 0 15px 10px;
  color: ${(props) => props.theme.colors.BLUE};
  cursor: pointer;
`;

export const Copyright = styled.p`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.BLUE};
`;

export const NavBox = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin: 0;
  z-index: 5;
  padding: 10px 5%;
  border: 1px soild ${(props) => props.theme.colors.GREY};
  box-shadow: 0px 0px 3px 1px ${(props) => props.theme.colors.GREY};
  border-radius: 15px 15px 0 0;
  color: ${(props) => props.theme.colors.BLUE};
  background-color: ${(props) => props.theme.colors.YELLOW_100};
  height: 100px;
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  transition: 0.5s ease;
  font-size: 1.2rem;

  & i {
    font-size: 35px;
    width: auto;
  }
`;

export const NavBoxItem = styled.li`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor:pointer;

  & p {
    font-size: 1rem;
    line-height: 23px;
  }
`;

export const NavBoxImgWrap = styled.div`
  display: flex;
  align-items: center;
  height: 50px;

  & img {
    width: auto;
    height: 30px;
  }
`;
