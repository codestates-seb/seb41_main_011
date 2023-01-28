import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/UI/Button';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  calculateStatus,
  viewBookDate,
  viewCost,
  viewProgramDate,
} from '../utils';

const Contents = styled.main`
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 60px 20px 110px;
  color: #333;

  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }

  @media screen and (min-width: 1000px) {
    width: 1000px;
    margin: 0 auto;
  }

  @media screen and (min-width: 1200px) {
    padding: 90px 0 20px;
    min-height: calc(100vh - 70px);
  }
`;

const Detail = styled.div`
  background-color: #eceee2;
  padding: 1.43rem;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;

  h4 {
    font-weight: 500;
  }

  ul li {
    font-weight: 300;
    margin-top: 8px;

    strong {
      font-weight: 500;
      color: #72ab76;
      margin-right: 16px;
    }

    p {
      margin-top: 6px;
    }

    .cancel {
      border: none;
      background: none;
      font-size: 1rem;
      padding: 0;
      color: #8e6610;
      font-weight: 400;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }

    .tip {
      display: block;
      font-size: 0.85rem;
      margin-top: 4px;
      color: #666;
    }
  }

  @media screen and (min-width: 768px) {
    h4 {
      font-size: 1.15rem;
      margin-bottom: 8px;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: ${({ mgt }: { mgt: string }) => mgt};

  a {
    color: inherit;
    display: block;
  }
`;

const Title = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 1.83rem;
  text-align: left;
  width: 100%;
  line-height: 1.3;
  margin-bottom: 0.4rem;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  background: #e2d48a;
  color: #5b3e00;
  font-weight: 700;
`;

const MyProgramDetailG = () => {
  const payId = useParams().id;
  const [programInfo, setProgramInfo] = useState({
    payId: 0,
    createdAt: '',
    status: '',
    programId: 0,
    title: '',
    dateStart: '',
    dateEnd: '',
    userMax: 0,
    cost: 0,
    zoomLink: '',
    announce: '',
    counselorName: '',
  });

  const getProgramInfo = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_DB_HOST + `/api/pays/lookup/${payId}`,
      );
      setProgramInfo(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProgramInfo();
  }, [payId]);

  const patchPayment = async () => {
    try {
      await axios.patch(
        process.env.REACT_APP_DB_HOST + `/api/pays/lookup/${payId}/edit`,
      );
      alert('취소 신청이 완료 되었습니다.');
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  const cancelBookHandler = () => {
    const confirmCancel = window.confirm('프로그램 예약을 취소할까요?');
    if (confirmCancel) {
      patchPayment();
    }
  };

  return (
    <div>
      <Header />
      <Contents>
        <Status>
          {calculateStatus(
            programInfo.status,
            programInfo.dateStart,
            programInfo.dateEnd,
          )}
        </Status>
        <Title>{programInfo.title}</Title>
        <Detail>
          <ul>
            <li>
              <strong>상담사</strong>
              {programInfo.counselorName}
            </li>
            <li>
              <strong>일정</strong>
              {viewProgramDate(programInfo.dateStart, programInfo.dateEnd)}
            </li>
            <li>
              <strong>정원</strong>최대 {programInfo.userMax}인
            </li>
          </ul>
        </Detail>

        <Detail>
          <h4>프로그램 참여 안내</h4>
          <ul>
            <li>
              <strong>그룹 상담 접속 링크</strong>
              {programInfo.zoomLink ? (
                <p>
                  <a href={programInfo.zoomLink} target='blank'>
                    {programInfo.zoomLink}
                  </a>
                </p>
              ) : (
                <p>접속 링크는 상담 시작 20분 전까지 전달됩니다.</p>
              )}
            </li>
            <li>
              <strong>참여자 전달 사항</strong>
              {programInfo.announce ? (
                <p>{programInfo.announce}</p>
              ) : (
                <p>전달사항이 없습니다.</p>
              )}
            </li>
          </ul>
        </Detail>

        <Detail>
          <h4>예약 정보</h4>
          <ul>
            <li>
              <strong>예약일시</strong>
              {viewBookDate(programInfo.createdAt)}
            </li>
            <li>
              <strong>결제금액</strong>
              {viewCost(programInfo.cost)}원
            </li>
            <li>
              <strong>결제방법</strong>신용카드
            </li>
            <li>
              <strong>예약취소</strong>
              {programInfo.status === '결제 완료' ? (
                <>
                  <button
                    className='cancel'
                    type='button'
                    onClick={cancelBookHandler}
                  >
                    취소신청
                  </button>
                  <span className='tip'>
                    * 예약 취소는 일정 시작 48시간 전까지만 가능합니다.
                  </span>
                </>
              ) : (
                programInfo.status
              )}
            </li>
          </ul>
        </Detail>
        <ButtonWrapper mgt='4px'>
          <Button width='100%' height='3em' fontsize='1rem'>
            <Link to='/mypage'>목록보기</Link>
          </Button>
        </ButtonWrapper>
      </Contents>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default MyProgramDetailG;
