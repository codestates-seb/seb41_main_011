import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tabbar from '../components/Tabbar';
import { useAppSelector } from '../store/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import api from '../RefreshToken';
import { viewProgramDate, viewCost } from '../utils';

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

  .div {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    gap: 2px;
    input {
      max-width: calc((100% - 16px) / 3);
    }
  }
  @media screen and (min-width: 768px) {
    width: 500px;
    .div {
      gap: 8px;
      input {
        max-width: calc((500px - 16px) / 3);
      }
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
  const programId = useAppSelector((state) => state.payment.programId);
  const navigate = useNavigate();

  const [programInfo, setProgramInfo] = useState({
    programId: 0,
    title: '',
    content: '',
    userMax: 0,
    userCount: 0,
    cost: 0,
    image: '',
    dateStart: '',
    dateEnd: '',
    symptomTypes: [],
    counselorName: '',
    profile: '',
    introduce: '',
    expertiseField: '',
  });

  const getProgramInfo = async () => {
    try {
      const response = await api.get(`/api/programs/lookup/${programId}`);
      setProgramInfo(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProgramInfo();
  }, [programId]);

  const [cardOwner, setCardOwner] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cvvNum, setCvvNum] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCardOwner(event.target.value);
  };
  const cardNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNum(event.target.value.replace(/[^0-9]/g, ''));
  };
  const cvvNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCvvNum(event.target.value.replace(/[^0-9]/g, ''));
  };
  const expirationMonthChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setExpirationMonth(event.target.value.replace(/[^0-9]/g, ''));
  };
  const expirationYearChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setExpirationYear(event.target.value.replace(/[^0-9]/g, ''));
  };

  const postPayment = async () => {
    try {
      const reqBody = {
        cardOwner,
        cardNum,
        cvvNum,
        expirationTime: `${expirationMonth}/${expirationYear}`,
      };
      await api.post(`/api/pays/${programId}/post`, reqBody);
      navigate('/program/booking-completed');
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const ToBookingConfirmed = () => {
    postPayment();
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
            <div>{programInfo.title}</div>
            <div className='contentName'>상담사</div>
            <div>{programInfo.counselorName}</div>
            <div className='contentName'>일시</div>
            <div>
              {viewProgramDate(programInfo.dateStart, programInfo.dateEnd)}
            </div>
            <div className='contentName'>비용</div>
            <div>{viewCost(programInfo.cost)}원</div>
          </SubMessage>

          <InputGrid>
            <Input
              placeholder='카드 소유자 이름'
              type='text'
              value={cardOwner}
              onChange={nameChangeHandler}
              required
            />
            <Input
              placeholder='카드번호 (숫자만 입력하세요)'
              type='text'
              value={cardNum}
              maxLength={16}
              onChange={cardNumberChangeHandler}
              required
            />
            <div className='div'>
              <Input
                placeholder='유효기간(MM)'
                type='text'
                maxLength={2}
                value={expirationMonth}
                onChange={expirationMonthChangeHandler}
                required
              />
              <Input
                placeholder='유효기간(YY)'
                type='text'
                maxLength={2}
                value={expirationYear}
                onChange={expirationYearChangeHandler}
                required
              />
              <Input
                placeholder='CVV/CVC'
                type='text'
                maxLength={3}
                value={cvvNum}
                onChange={cvvNumberChangeHandler}
                required
              />
            </div>
          </InputGrid>
          <Button onClick={() => ToBookingConfirmed()}>결제하기</Button>
        </ContentWrapper>
        <Logo src='/green-tea.png'></Logo>
      </OuterWrapper>
      <Footer />
      <Tabbar />
    </div>
  );
};

export default Book;
