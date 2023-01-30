import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import api from '../RefreshToken';

import ProgramFilter from '../components/ProgramFilter';
import ProgramList from '../components/ProgramList';
import Tabbar from '../components/Tabbar';

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

        h2 {
          font-weight: 700;
          font-size: 2rem;
          line-height: 1.35;
          text-align: left;
          color: #8e6610;
        }
      }

      .pagecontent {
        margin: 0;
      }
    }
  }
`;

const AllPrograms = () => {
  const [allPrograms, setAllPrograms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getAllPrograms = async () => {
    try {
      const response = await api.get(`/api/programs/lookup/list`);
      setAllPrograms(response.data.data);
      setTotalPage(response.data.pageInfo.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPrograms();
  }, [page]);

  return (
    <div>
      <Header />
      <Contents>
        <div className='listwrap'>
          <div className='pagetitle'>
            <h2>
              그룹 테라피
              <br />
              프로그램
            </h2>
          </div>
          <div className='pagecontent'>
            <ProgramFilter />
            <ProgramList data={allPrograms} />
          </div>
        </div>
      </Contents>
      <Footer />
      <Tabbar />
    </div>
  );
};

export default AllPrograms;
