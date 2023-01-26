import styled, { css } from 'styled-components/macro';

export const CardWrap = styled.div`
  margin: auto;
  padding: 15px 0;
  width: 100%;
  max-width: 500px;
  min-height: 200px;
  border-top: 1px solid ${(props) => props.theme.colors.GREY};
  border-bottom: 1px solid ${(props) => props.theme.colors.GREY};
  
  @media screen and (min-width: 501px) {
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.GREY};
    border: none;
    border-radius: 5px;
`;

export const UserWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export const UserImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const UserName = styled.span`
  margin-left: 10px;
  font-size: 1.1rem;
`;

export const ImgWrap = styled.div`
  max-width: 500px;
  max-height: 450px;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export const CardContentWrap = styled.div`
  padding: 15px 15px 0px 15px;
`;

export const ContentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .hearticon {
    color: ${(props) => props.theme.colors.RED};
    font-size: 25px;
  }

  & .chaticon {
    color: ${(props) => props.theme.colors.BLACK};
    font-size: 25px;
    margin-left: 8px;
  }

  & span {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.GREY_100};
  }
`;

export const IconWrap = styled.span`
  display: inline-block;
  transform: rotate(-20deg);

`;

export const Content = styled.div`
  min-height: 50px;
  margin-top: 20px;
`;

export const CommentWrap = styled.div``;

export const CommentCount = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.GREY_100};
  margin-bottom: 10px;
`;

export const Comment = styled.div`
  & span {
    font-weight: bold;
    margin-right: 10px;
  }
`;
