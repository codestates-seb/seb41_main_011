import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/@ibm/plex/css/ibm-plex-sans-kr.min.css';
import ScrollToTop from './utils/ScrollToTop';
import Intro from './pages/Intro';
import About from './pages/About';
import Test from './pages/Test';
import TestResult from './pages/TestResult';
import AllPrograms from './pages/AllPrograms';
import ProgramDetail from './pages/ProgramDetail';
import Signup from './pages/Signup';
import EditUserInfo from './pages/EditUserInfo';
import MypageGeneral from './pages/MypageGeneral';
import Book from './pages/Book';
import BookingCompleted from './pages/BookingCompleted';
import MypageGeneralDetail from './pages/MypageGeneralDetail';
import MypageTherapistDetail from './pages/MypageTherapistDetail';
import EditUserInfoTherapist from './pages/EditUserInfoTherapist';
import WriteNotice from './pages/WriteNotice';
import WriteBoard from './pages/WriteBoard';
import ModifyNotice from './pages/ModifyNotice';
import ModifyBoard from './pages/ModifyBoard';
import LoginGeneral from './pages/LoginGeneral';
import LoginTherapist from './pages/LoginTherapist';
import UserManagement from './admin/pages/UserManagement';
import ProgramManagement from './admin/pages/ProgramManagement';
import PaymentManagement from './admin/pages/PaymentManagement';
import CommunityMain from './pages/CommunityMain';
import CommunityPost from './pages/CommunityPost';
import MypageTherapist from './pages/MypageTherapist';
import AdminEditInfo from './admin/pages/AdminEditInfo';
import AdminIndex from './admin/pages/AdminIndex';
import SymptomPrograms from './pages/SymptomPrograms';
import { useEffect } from 'react';
import moment from 'moment';
import { momentTest } from './moment';
import { useAppSelector } from './store/hooks';
import KakaoAuthHandler from './pages/KakaoAuthHandler';
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
  // useEffect(() => {
  //   momentTest();
  // });

  const userRole = useAppSelector((state) => state.login.role);
  const isFirst = useAppSelector((state) => state.intro.firstVisit);

  return (
    <div className='App'>
      <BrowserRouter>
        <GlobalStyle />
        <ScrollToTop />
        <Routes>
          <Route path='/intro' element={<Intro />} />

          <Route path='/' element={isFirst ? <Intro /> : <AllPrograms />} />
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
              userRole === 'COUNSELOR' ? <MypageTherapist /> : <MypageGeneral />
            }
          />
          <Route
            path='/myprogram/:id'
            element={
              userRole === 'COUNSELOR' ? (
                <MypageTherapistDetail />
              ) : (
                <MypageGeneralDetail />
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

          <Route path='/login' element={<LoginGeneral />} />
          <Route path='/login-therapist' element={<LoginTherapist />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/kakaoOauth' element={<KakaoAuthHandler />} />

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
