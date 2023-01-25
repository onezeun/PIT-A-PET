import { createGlobalStyle, css } from 'styled-components/macro';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
  box-sizing: border-box;
  };

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  };

  @font-face {
    font-family: 'IM_Hyemin-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Bold.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
  };

  html, input, button {
    font-size: 16px;
    font-family: 'Pretendard-Regular', sans-serif;
  };

  input:focus {outline:none;}


  a {
    text-decoration: none;
    color: black;

    & ::hover {
      color: black;
    }
  }
`;

export default GlobalStyle;
