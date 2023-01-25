import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tabbar from '../components/tabbar';

const OuterWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 5vw;
  width: 100%;
  padding: 60px 20px 110px;

  @media screen and (min-width: 768px) {
    padding: 84px 20px 0;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: center;
    padding: 70px 0 0;
    min-height: calc(100vh - 70px);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;

  @media screen and (min-width: 1200px) {
    width: 500px;
  }
`;

const MainMessage = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: center;
  width: 100%;
  @media screen and (min-width: 1200px) {
    text-align: left;
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

const InputGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  @media screen and (min-width: 768px) {
    width: 500px;
  }
  .div {
    display: grid;
    grid-template-columns: 58% 40%;
    gap: 2%;
  }
  .select {
    color: gray;
    border-radius: 12px;
    border: 1px solid #ddd;
    padding-left: 3%;
    padding-right: 3%;
    .placeholder {
      display: none;
    }
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

const Input = styled.input`
  border-radius: 12px;
  border: 1px solid #ddd;
  padding: 8px 16px;
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    outline: none;
  }
  ::placeholder {
    color: #828282;
    font-size: 0.85rem;
  }
`;

const Logo = styled.img`
  width: 400px;
  height: 400px;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const MobileLogo = styled.img`
  width: 20vw;
  @media screen and (min-width: 768px) {
    width: 15vw;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

const Book = () => {
  const navigate = useNavigate();
  const ToBookingConfirmed = () => {
    navigate('/program/booking-completed');
  };
  return (
    <div>
      <Header />
      <OuterWrapper>
        <ContentWrapper>
          <MobileLogo src='/teacup.png' />

          <MainMessage>예약 결제하기</MainMessage>
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

          <InputGrid>
            <Input placeholder='Name on card'></Input>
            <Input placeholder='Credit card number'></Input>
            <div className='div'>
              <select className='select'>
                <option className='placeholder' disabled selected>
                  Expires
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <Input placeholder='cvv'></Input>
            </div>
          </InputGrid>
          <Button onClick={() => ToBookingConfirmed()}>결제하기</Button>
        </ContentWrapper>
        {/* 결제 버튼 클릭 시 requst body(POST): 일반회원 고유ID, 이름(실명), 결제 고유ID, 결제 방법, 결제상태 */}

        <Logo src='/green-tea.png'></Logo>
      </OuterWrapper>
      <Footer />
      <Tabbar />
    </div>
  );
};

export default Book;
