import styled, { css } from 'styled-components/macro';

export const UserWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const UserImg = styled.img`
  width: 100px;
  height: 100px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
`;

export const CountWrap = styled.ul`
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-bottom: 10px;

  & li {
    display: flex;
    flex-direction: column;
    line-height: 25px;
  }
`;

export const PetWrap = styled.div`
  margin-bottom: 20px;
`;

export const PetImgWrap = styled.div`
  text-align: center;

  & img {
    width: 100px;
    height: 100px;
    margin: 5px 0;
    border-radius: 50%;
  }
`;

export const Intro = styled.div`
  padding: 20px;
  margin: 15px 10px;
  border-radius:5px;
  background: ${(props) => props.theme.colors.YELLOW_100};
`;

export const UserHomeBtn = styled.button`
  border-radius: 5px;
  width: 100%;
  height: 40px;
`;
