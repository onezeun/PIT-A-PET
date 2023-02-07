import styled, { css } from 'styled-components/macro';

export const EditBox = styled.div<{transition:string}>`
  opacity: 0;
  transition: ${(props) => props.transition};

  &.opacity {
    opacity: 1;
  }
`;

export const MessageBoxWrap = styled.div`
  margin: 0 auto 20px;
  padding: 15px;
  width: 95%;
  max-width: 500px;
  height: 46px;

  box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.GREY};
  background: ${(props) => props.theme.colors.WHITE};
  border-radius: 5px;
  transition: 0.5s ease;

  &.open {
    background: ${(props) => props.theme.colors.YELLOW_100};
    box-shadow: 0px 0px 0px 0px;
    height: 741px;
  }

  @media screen and (min-width: 501px) {
    width: 100%;
  }
`;
