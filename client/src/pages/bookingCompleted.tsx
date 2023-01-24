import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 110px;
  gap: 24px;

  @media screen and (min-width: 768px) {
    padding: 84px 20px 0;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    padding: 90px 0 0;
    min-height: calc(100vh - 70px);
  }
`;

const MainMessage = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  width: 100%;
  text-align: center;
  @media screen and (min-width: 1200px) {
    width: 500px;
  }
`;

const SubMessage = styled.div`
  display: grid;
  padding: 16px 20px;
  grid-template-columns: 30% 70%;
  line-height: 2;
  width: 100%;
  background-color: #eceee2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  .contentName {
    font-weight: 500;
    color: #5e430b;
  }

  @media screen and (min-width: 768px) {
    width: 500px;
    padding: 16px 24px;
  }
`;
const Button = styled.button`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 4px;
  border-radius: 10px;
  border: none;
  height: 3em;
  width: 100%;
  background-color: #c4dcbf;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #70846c;
    color: white;
  }

  @media screen and (min-width: 768px) {
    width: 500px;
  }
`;
const Logo = styled.img`
  width: 20vw;
  @media screen and (min-width: 768px) {
    width: 15vw;
  }
  @media screen and (min-width: 1200px) {
    width: 140px;
  }
`;

const BookingCompleted = () => {
  const navigate = useNavigate();
  const toMain = () => {
    navigate('/');
  };

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Logo src='/teacup.png'></Logo>
        <MainMessage>예약이 완료되었습니다!</MainMessage>
        <SubMessage>
          <div className='contentName'>프로그램명</div>
          <div>프로그램 1</div>
          <div className='contentName'>상담사</div>
          <div>오은영</div>
          <div className='contentName'>일시</div>
          <div>2023년 0월 0일 3:30PM~ 4:30PM</div>
          <div className='contentName'>비용</div>
          <div>20,000원</div>
        </SubMessage>
        <Button onClick={toMain}>메인 페이지로</Button>

        <Tabbar />
      </ContentWrapper>
      <Footer />
    </div>
  );
};

export default BookingCompleted;
