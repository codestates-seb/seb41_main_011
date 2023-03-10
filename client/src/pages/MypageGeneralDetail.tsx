import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/UI/Button';
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import {
  calculateStatus,
  viewBookDate,
  viewCost,
  viewProgramDate,
} from '../utils';
import api from '../RefreshToken';
import { useAppSelector } from '../store/hooks';

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

const MypageGeneralDetail = () => {
  const userRole = useAppSelector((state) => state.login.role);
  const navigate = useNavigate();

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
      const response = await api.get(`/api/pays/lookup/${payId}`);
      setProgramInfo(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userRole === '') {
      navigate('/login');
    } else if (userRole === 'USER') {
      getProgramInfo();
    } else {
      alert('????????? ??? ????????? ??????????????? ????????????.');
      navigate('/');
    }
  }, [payId]);

  const patchPayment = async () => {
    try {
      await api.patch(`/api/pays/lookup/${payId}/edit`);
      alert('?????? ????????? ?????? ???????????????.');
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  const cancelBookHandler = () => {
    const confirmCancel = window.confirm('???????????? ????????? ????????????????');
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
              <strong>?????????</strong>
              {programInfo.counselorName}
            </li>
            <li>
              <strong>??????</strong>
              {viewProgramDate(programInfo.dateStart, programInfo.dateEnd)}
            </li>
            <li>
              <strong>??????</strong>?????? {programInfo.userMax}???
            </li>
          </ul>
        </Detail>

        <Detail>
          <h4>???????????? ?????? ??????</h4>
          <ul>
            <li>
              <strong>?????? ?????? ?????? ??????</strong>
              {programInfo.zoomLink ? (
                <p>
                  <a href={programInfo.zoomLink} target='blank'>
                    {programInfo.zoomLink}
                  </a>
                </p>
              ) : (
                <p>?????? ????????? ?????? ?????? 20??? ????????? ???????????????.</p>
              )}
            </li>
            <li>
              <strong>????????? ?????? ??????</strong>
              {programInfo.announce ? (
                <p>{programInfo.announce}</p>
              ) : (
                <p>??????????????? ????????????.</p>
              )}
            </li>
          </ul>
        </Detail>

        <Detail>
          <h4>?????? ??????</h4>
          <ul>
            <li>
              <strong>????????????</strong>
              {viewBookDate(programInfo.createdAt)}
            </li>
            <li>
              <strong>????????????</strong>
              {viewCost(programInfo.cost)}???
            </li>
            <li>
              <strong>????????????</strong>????????????
            </li>
            <li>
              <strong>????????????</strong>
              {programInfo.status === '?????? ??????' ? (
                <>
                  <button
                    className='cancel'
                    type='button'
                    onClick={cancelBookHandler}
                  >
                    ????????????
                  </button>
                  <span className='tip'>
                    * ?????? ????????? ?????? ?????? 48?????? ???????????? ???????????????.
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
            <Link to='/mypage'>????????????</Link>
          </Button>
        </ButtonWrapper>
      </Contents>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default MypageGeneralDetail;
