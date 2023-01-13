import reset from 'styled-reset';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './pages/intro';
import About from './pages/about';
import Test from './pages/test';
import TestResult from './pages/test_result';
import AllPrograms from './pages/all_programs';
import ProgramDetail from './pages/program_detail';
import Signup from './pages/signup';
import EditUserInfo from './pages/edit_userinfo_general';
import EditUserInfoTherapist from './pages/edit_userinfo_therapist';
import '../node_modules/@ibm/plex/css/ibm-plex-sans-kr.min.css';  
import LoginGeneral from './pages/login_general';
import LoginTherapist from './pages/login_therapist';
import Main from './admin/pages/adminIndex';
import UserManagement from './admin/pages/userManagement';
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
          <Route path="/edit-userinfo" element={<EditUserInfo />} />
          <Route path="/edit-userinfo-therapist" element={<EditUserInfoTherapist />} />
          <Route path='/' element={<AllPrograms />} />
          <Route path='/program/:id' element={<ProgramDetail />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login-general' element={<LoginGeneral />} />
          <Route path='/login-therapist' element={<LoginTherapist />} />
          <Route path='/admin' element={<Main />} />
          <Route path='/UserManagement' element={<UserManagement />} />
          <Route path='/programsManagement' element={<Main />} />
          <Route path='/AssetManagement' element={<Main />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
