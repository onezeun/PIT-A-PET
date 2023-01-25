import styled, { css } from 'styled-components/macro';

export const HeaderContainer = styled.div`
  display: flex;
  aline-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  height: 80px;
  padding: 20px;
  line-height: 50px;
`;

export const LogoWrap = styled.div`
  vertical-align: center;
  height: 40px;

  & img {
    width: 176px;
    height: 40px;
  }
`;

export const GNB = styled.div`
  & .icolor {
    color: #5eb5e0;
    margin-left: 10px;
    font-size: 35px;
  }
`;

export const SideBarWrap = styled.div`
  display: block;
  z-index: 10;
  padding: 12px;
  border: 1px soild #ccc;
  box-shadow: 0px 0px 5px 1px #ccc;
  border-radius: 15px 0 0 15px;
  background-color: #fff0ca;
  height: 100%;
  width: 50vw;
  right: -60%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;
  font-size: 1.2rem;

  & .icolor {
    color: #5eb5e0;
    margin-left: 0;
    font-size: 40px;
  }

  & .item {
    margin: 0 0 15px 10px;
    color: #5eb5e0;
  }

  &.open {
    right: 0;
    transition: 0.5s ease;
  }

  & p {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 1rem;
    color: #5eb5e0;
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

export const NavBox = styled.ul`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin: 0;
  z-index: 5;
  padding: 10px 5%;
  border: 1px soild #ccc;
  box-shadow: 0px 0px 3px 1px #ccc;
  border-radius: 15px 15px 0 0;
  background-color: white;
  height: 100px;
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  transition: 0.5s ease;
  font-size: 1.2rem;

  & li {
    width: 25%;
  }
`;
