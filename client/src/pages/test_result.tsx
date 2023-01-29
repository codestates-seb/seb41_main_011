import styled from 'styled-components';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';
import Program from '../components/Program';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { programListItemProps } from '../types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { testActions } from '../store/test';

const ContentWrapper = styled.div`
  min-height: (100vh - 60px);
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
    width: 1200px;
    margin: 0 auto;
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

const Top = styled.div`
  width: 100%;
  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

const MainMessage = styled.div`
  width: 100%;
  color: #4b6a4d;
  font-weight: 700;
  font-size: 1.83rem;
  text-align: left;
  line-height: 1.3;

  @media screen and (min-width: 500px) {
    font-size: 2rem;
  }
`;
const ToAllPrograms = styled.div`
  color: #4b6a4d;
  text-align: right;
  font-size: 1rem;
  width: fit-content;
  margin-left: auto;
  text-decoration: underline;
  transition: all 0.2s;

  &:hover {
    color: #b47e19;
  }

  a {
    color: inherit;
  }
`;

const ProgramWrapper = styled.ul`
  width: 100%;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .empty {
    text-align: center;
    line-height: 1.8;
    color: #333;
    padding: 3em 0;

    a {
      display: block;
      color: inherit;
      margin: 24px auto;
      background: #c4dcbf;
      width: 80%;
      padding: 1em 0;
      border-radius: 12px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      transition: all 0.2s;

      &:hover,
      &:active {
        background: #70846c;
        color: #fff;
      }
    }
  }

  @media screen and (min-width: 500px) {
    width: 500px;
    margin: 0 auto;
  }

  @media screen and (min-width: 768px) {
    padding-bottom: 24px;
  }
`;

const TestResult = () => {
  const searchKeyword = useAppSelector((state) => state.test.searchKeyword);
  const dispatch = useAppDispatch();

  const [programList, setProgramList] = useState([]);

  const getPrograms = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_DB_HOST +
          `/api/programs/lookup/search?search=${searchKeyword}&page=1&size=10`,
      );
      setProgramList(response.data.data);
      dispatch(testActions.result(''));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Logo src='/teacup.png' />
        <Top>
          <MainMessage>
            당신에게 추천하는 <br />
            프로그램 이에요
          </MainMessage>
          <ToAllPrograms>
            <Link to='/'>다른 프로그램도 볼래요</Link>
          </ToAllPrograms>
        </Top>
        <ProgramWrapper>
          {programList.length !== 0 ? (
            programList.map((item: programListItemProps) => {
              return (
                <li key={item.programId}>
                  <Link to={`/program/${item.programId}`}>
                    <Program item={item} />
                  </Link>
                </li>
              );
            })
          ) : (
            <li>
              <div className='empty'>
                당신에게 꼭 맞는 <br />
                그룹 테라피 프로그램을 열심히 준비중입니다.
                <br />
                다른 프로그램도 둘러보세요.
                <Link to='/'>전체 프로그램 보기</Link>
              </div>
            </li>
          )}
        </ProgramWrapper>
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default TestResult;
