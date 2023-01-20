import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tabbar from '../components/tabbar';

const OuterWrapper = styled.div`
  min-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  gap: 5vw;
  @media screen and (min-width: 768px) {
    padding-top: 64px;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    flex-direction: row;
    padding-top: 70px;
    min-height: calc(100vh - 70px);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const MainMessage = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: center;
  width: 100%;
  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const SubMessage = styled.div`
  display: grid;
  padding: 5%;
  height: auto;
  grid-template-columns: 30% 70%;
  line-height: 30px;
  width: 80vw;
  background-color: #eceee2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
    width: 400px;
  }

  @media screen and (min-width: 1200px) {
    font-size: 16px;
  }

  .contentName {
    font-weight: 500;
    color: #5e430b;
  }
`;

const InputGrid = styled.div`
  display: grid;
  width: 80vw;
  height: auto;
  grid-template-columns: auto;
  gap: 10%;
  @media screen and (min-width: 768px) {
    font-size: 14px;
    width: 400px;
  }
  .div {
    display: flex;
    justify-content: space-between;
  }
  .select {
    color: gray;
    width: 50%;
    @media screen and (max-width: 768px) {
      width: 45%;
    }
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    padding-left: 3%;
    padding-right: 3%;
    .placeholder {
      display: none;
    }
  }
`;
const Button = styled.button`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  border: none;
  height: 3em;
  width: 20em;
  background-color: #c4dcbf;
  font-weight: 500;
  color: #3d553e;
  font-size: 1rem;
  margin-top: 10px;

  &:hover {
    background-color: #70846c;
    color: white;
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    height: 3em;
    width: 35vw;
    font-size: 14px;
  }

  @media screen and (min-width: 1200px) {
    height: 3em;
    width: 400px;
    font-size: 16px;
  }
`;

const Input = styled.input`
  height: 30px;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  padding-left: 3%;
  padding-right: 3%;
  @media screen and (min-width: 768px) {
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    outline: none;
  }
  ::placeholder {
  }
`;

const Logo = styled.img`
  width: 400px;
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
    navigate('/booking-completed');
  };
  return (
    <div>
      <Header />
      <OuterWrapper>
        <Tabbar />
        <ContentWrapper>
          <MobileLogo src='teacup.png' />

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

        <Logo src='green-tea.png'></Logo>
      </OuterWrapper>
      <Footer />
    </div>
  );
};

export default Book;
