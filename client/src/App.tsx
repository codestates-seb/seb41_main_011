import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import '../node_modules/@ibm/plex/css/ibm-plex-sans-kr.min.css';
import ScrollToTop from './utils/ScrollToTop';
import Intro from './pages/intro';
import About from './pages/about';
import Test from './pages/test';
import TestResult from './pages/test_result';
import AllPrograms from './pages/all_programs';
import ProgramDetail from './pages/program_detail';
import Signup from './pages/signup';
import EditUserInfo from './pages/edit_userinfo_general';
import MyPageGeneral from './pages/mypage_general';
import Book from './pages/book';
import BookingCompleted from './pages/bookingCompleted';
import '../node_modules/@ibm/plex/css/ibm-plex-sans-kr.min.css';
import MyProgramDetailG from './pages/my_p_detail_general';
import MyProgramDetailT from './pages/my_p_detail_therapist';
import EditUserInfoTherapist from './pages/edit_userinfo_therapist';
import WriteNotice from './pages/WriteNotice';
import WriteBoard from './pages/WriteBoard';
import ModifyNotice from './pages/ModifyNotice';
import ModifyBoard from './pages/ModifyBoard';
import '../node_modules/@ibm/plex/css/ibm-plex-sans-kr.min.css';
import LoginGeneral from './pages/login_general';
import LoginTherapist from './pages/login_therapist';
import UserManagement from './admin/pages/userManagement';
import ProgramManagement from './admin/pages/programManagement';
import PaymentManagement from './admin/pages/paymentManagement';
import CommunityMain from './pages/community_main';
import CommunityPost from './pages/community_post';
import MyPageTherapist from './pages/mypage_therapist';
import AdminEditInfo from './admin/pages/adminEditInfo';
import AdminIndex from './admin/pages/adminIndex';
import SymptomPrograms from './pages/SymptomPrograms';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { momentTest } from './moment';
import { useAppSelector } from './store/hooks';
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
  useEffect(() => {
    momentTest();
  });

  const userRole = useAppSelector((state) => state.login.role);

  return (
    <div className='App'>
      <BrowserRouter>
        <GlobalStyle />
        <ScrollToTop />
        <Routes>
          <Route path='/intro' element={<Intro />} />

          <Route path='/' element={<AllPrograms />} />
          <Route path='/programs/:id' element={<SymptomPrograms />} />
          <Route path='/program/:id' element={<ProgramDetail />} />
          <Route path='/program/book' element={<Book />} />
          <Route
            path='/program/booking-completed'
            element={<BookingCompleted />}
          />

          <Route path='/about' element={<About />} />
          <Route path='/about/test' element={<Test />} />
          <Route path='/about/test-result' element={<TestResult />} />

          <Route path='/community/notice' element={<CommunityMain />} />
          <Route path='/community/notice/:id' element={<CommunityPost />} />
          <Route path='/community/general' element={<CommunityMain />} />
          <Route path='/community/general/:id' element={<CommunityPost />} />
          <Route path='/community/notice/write' element={<WriteNotice />} />
          <Route path='/community/general/write' element={<WriteBoard />} />
          <Route path='/community/notice/modify' element={<ModifyNotice />} />
          <Route path='/community/general/modify' element={<ModifyBoard />} />

          <Route
            path='/mypage'
            element={
              userRole === 'COUNSELOR' ? <MyPageTherapist /> : <MyPageGeneral />
            }
          />
          <Route
            path='/myprogram/:id'
            element={
              userRole === 'COUNSELOR' ? (
                <MyProgramDetailT />
              ) : (
                <MyProgramDetailG />
              )
            }
          />
          <Route
            path='/edit-userinfo'
            element={
              userRole === 'COUNSELOR' ? (
                <EditUserInfoTherapist />
              ) : (
                <EditUserInfo />
              )
            }
          />

          <Route path='/login-general' element={<LoginGeneral />} />
          <Route path='/login-therapist' element={<LoginTherapist />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/admin' element={<AdminIndex />} />
          <Route path='/admin/editInfo' element={<AdminEditInfo />} />
          <Route path='/userManagement' element={<UserManagement />} />
          <Route path='/programsManagement' element={<ProgramManagement />} />
          <Route path='/paymentManagement' element={<PaymentManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
