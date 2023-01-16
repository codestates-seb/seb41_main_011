import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './pages/intro';
import About from './pages/about';
import Test from './pages/test';
import TestResult from './pages/test_result';
import AllPrograms from './pages/all_programs';
import ProgramDetail from './pages/program_detail';
import Signup from './pages/signup';
import EditUserInfo from './pages/edit_userinfo_general';
import MyProgramDetailG from './pages/my_p_detail_general';
import MyProgramDetailT from './pages/my_p_detail_therapist';
import EditUserInfoTherapist from './pages/edit_userinfo_therapist';
import WriteNotice from './pages/WriteNotice';
import WriteBoard from './pages/WriteBoard';
import ModifyNotice from './pages/ModifyNotice';
import ModifyBoard from './pages/ModifyBoard';
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
          <Route path='/intro' element={<Intro />} />
          <Route path='/about' element={<About />} />
          <Route path='/test' element={<Test />} />
          <Route path='/test-result' element={<TestResult />} />
          <Route path='/edit-userinfo' element={<EditUserInfo />} />
          <Route
            path='/edit-userinfo-therapist'
            element={<EditUserInfoTherapist />}
          />
          <Route path='/' element={<AllPrograms />} />
          <Route path='/program/:id' element={<ProgramDetail />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/myprogramg/:id' element={<MyProgramDetailG />} />
          <Route path='/myprogramt/:id' element={<MyProgramDetailT />} />
          <Route path='/notice/write' element={<WriteNotice />} />
          <Route path='/board/write' element={<WriteBoard />} />
          <Route path='/notice/modify' element={<ModifyNotice />} />
          <Route path='/board/modify' element={<ModifyBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
