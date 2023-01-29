import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyPageProgram from '../components/MyPageProgram';
import Tabbar from '../components/tabbar';
import { myProgramListItemProps } from '../types';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 110px;
  gap: 16px;

  @media screen and (min-width: 700px) {
    gap: 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    width: 1080px;
    margin: 0 auto;
    padding: 90px 0 20px;
    min-height: calc(100vh - 70px);
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
  }
`;

const Title = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: left;
  width: 100%;
  @media screen and (min-width: 1200px) {
    width: calc(100% - 700px);
    padding-top: 50px;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (min-width: 700px) {
    width: 700px;
    margin: 0 auto;
  }
  @media screen and (min-width: 1200px) {
    padding-top: 20px;
  }
`;

const ProgramWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

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

      @media screen and (min-width: 768px) {
        width: 400px;
      }

      &:hover,
      &:active {
        background: #70846c;
        color: #fff;
      }
    }
  }
`;

const MyPageGeneral = () => {
  const [programList, setProgramList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getMyPrograms = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_DB_HOST +
          `/api/pays/lookup/list?page=${page}&size=10`,
      );
      setProgramList(response.data.data);
      setTotalPage(response.data.pageInfo.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyPrograms();
  }, [page]);

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Title>나의 테라피 프로그램</Title>
        <ListWrapper>
          <ProgramWrapper>
            {programList.length !== 0 ? (
              programList.map((item: myProgramListItemProps) => {
                return <MyPageProgram key={item.payId} item={item} />;
              })
            ) : (
              <div className='empty'>
                예약한 프로그램이 없습니다.
                <Link to='/'>그룹 테라피 프로그램 보기</Link>
              </div>
            )}
          </ProgramWrapper>
          <Pagination
            totalPage={totalPage}
            limit={5}
            page={page}
            setPage={setPage}
          />
        </ListWrapper>
        <Tabbar />
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default MyPageGeneral;
