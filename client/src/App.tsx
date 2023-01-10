import React from 'react';
import logo from './logo.svg';
import './App.css';
import './font.css';
import reset from 'styled-reset';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './pages/intro';
import About from './pages/about';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 13px; //1 rem = 13px. 모바일 화면 사이즈 기준
  }

  body {
    background-color: #F7F9ED;
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
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
