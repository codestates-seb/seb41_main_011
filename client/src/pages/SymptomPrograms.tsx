import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';

import ProgramFilter from '../components/ProgramFilter';
import ProgramList from '../components/ProgramList';
import Tabbar from '../components/tabbar';
import api from '../RefreshToken';

const Contents = styled.main`
  width: 100%;
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 40px 0 90px;

  .listwrap {
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 4px;
    position: relative;

    .pagetitle {
      display: none;
    }

    .pagecontent {
      width: 100%;
      padding: 0 20px;
    }
  }

  @media screen and (min-width: 700px) {
    padding: 64px 0 0;
    min-height: calc(100vh - 64px);
    .listwrap {
      .pagecontent {
        width: 700px;
        margin: 0 auto;
        padding: 0;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    padding-top: 70px;
    min-height: calc(100vh - 70px);
    .listwrap {
      width: 1000px;
      margin: 0 auto;
      justify-content: space-between;

      .pagetitle {
        display: flex;
        flex-direction: column;
        flex-basis: 160px;
        margin: 60px 0;
        gap: 16px;

        h2 {
          font-weight: 700;
          font-size: 2rem;
          line-height: 1.35;
          text-align: left;
          color: #8e6610;
        }
        h4 {
          font-weight: 700;
          font-size: 1.3rem;
          line-height: 1.35;
          text-align: left;
          color: #4b6a4d;
        }
      }

      .pagecontent {
        margin: 0;
      }
    }
  }
`;

const SymptomPrograms = () => {
  const { id } = useParams();

  const [searchKeyword, setSearchKeyword] = useState('');
  useEffect(() => {
    switch (id) {
      case '1':
        setSearchKeyword('스트레스');
        break;
      case '2':
        setSearchKeyword('불안');
        break;
      case '3':
        setSearchKeyword('우울');
        break;
      case '4':
        setSearchKeyword('중독');
        break;
    }
  }, [id]);

  const [symptomPrograms, setSymptomPrograms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getsymptomPrograms = async () => {
    try {
      const response = await api.get(
        `/api/programs/lookup/search?search=${searchKeyword}&page=${page}&size=10`,
      );
      setSymptomPrograms(response.data.data);
      setTotalPage(response.data.pageInfo.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      getsymptomPrograms();
    }
  }, [searchKeyword, page]);

  return (
    <div>
      <Header />
      <Contents>
        <div className='listwrap'>
          <div className='pagetitle'>
            <h2>
              고민별
              <br />
              프로그램
            </h2>
            <h4>#{searchKeyword}</h4>
          </div>
          <div className='pagecontent'>
            <ProgramFilter />
            <ProgramList data={symptomPrograms} />
          </div>
        </div>
      </Contents>
      <Footer />
      <Tabbar />
    </div>
  );
};

export default SymptomPrograms;
