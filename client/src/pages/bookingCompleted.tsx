import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { paymentActions } from '../store/payment';
import { viewCost, viewProgramDate } from '../utils';
import api from '../RefreshToken';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 110px;
  gap: 24px;

  a {
    color: inherit;
    display: block;
  }

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
  const programId = useAppSelector((state) => state.payment.programId);
  const dispatch = useAppDispatch();

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
      dispatch(paymentActions.programId(''));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProgramInfo();
  }, []);

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Logo src='/teacup.png'></Logo>
        <MainMessage>예약이 완료되었습니다!</MainMessage>
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
        <Button>
          <Link to='/'>메인 페이지로</Link>
        </Button>

        <Tabbar />
      </ContentWrapper>
      <Footer />
    </div>
  );
};

export default BookingCompleted;
