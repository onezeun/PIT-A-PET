import styled from 'styled-components/macro';

export const HeaderContainer = styled.div`
  display:flex;
  aline-items:center;
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
    color: #5EB5E0;
    margin-left: 10px;
    font-size: 35px;
  }
`;