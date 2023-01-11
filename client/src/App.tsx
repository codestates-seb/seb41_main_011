import './App.css';
import reset from 'styled-reset';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './pages/intro';
import About from './pages/about';
import Test from './pages/test';
import TestResult from './pages/test_result';
import AllPrograms from './pages/all_programs';
import ProgramDetail from './pages/program_detail';
import UserMypageProgram from './pages/mypage_user_program';
import '../node_modules/@ibm/plex/css/ibm-plex-sans-kr.min.css';  

const GlobalStyle = createGlobalStyle`
 ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  html {
    font-size: 13px; //1 rem = 13px. 모바일 화면 사이즈 기준
  }

  body {
    background-color: #F7F9ED;
    font-family: 'IBM Plex Sans KR', sans-serif;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
  html {
    font-size: 16px; //1 rem = 13px. 태블릿 이상 화면 사이즈 기준
  }
}
`;

function App() {
  return (

    <div className='App'>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/about" element={<About />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test-result" element={<TestResult />} />
          <Route path="/mypage-user-program" element={<UserMypageProgram />} />
          <Route path='/' element={<AllPrograms />} />
          <Route path='/program/:id' element={<ProgramDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
