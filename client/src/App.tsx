import React from 'react';
import './font.css';
import { createGlobalStyle } from "styled-components";
import Signup from './pages/signup';
import '../node_modules/@ibm/plex/css/ibm-plex-sans-kr.min.css';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 13px; //1 rem = 13px. 모바일 화면 사이즈 기준
  }

  body {
    font-family: 'IBM Plex Sans KR', sans-serif;
    line-height: 1.5;
  }

  @media screen and (min-width: 768px) {
  html {
    font-size: 16px; //1 rem = 13px. 태블릿 이상 화면 사이즈 기준
  }
}
`;

function App() {
  return (
    <>
    <GlobalStyle />
    <Signup/>
    
    </>
      

  );
}

export default App;
