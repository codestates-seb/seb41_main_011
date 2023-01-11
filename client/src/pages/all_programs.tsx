import styled from 'styled-components';

import ProgramFilter from '../components/ProgramFilter';
import ProgramList from '../components/ProgramList';

const Contents = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  /* 캐러셀 */
  .carousel {
    background: #b3d2b0;
    height: 55vw;
    line-height: 55vw;
  }

  .listwrap {
    justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 4px;
    position: relative;

    h2 {
      display: none;
    }

    > div {
      width: 100%;
      padding: 0 20px;
    }
  }

  @media screen and (min-width: 700px) {
    .listwrap {
      > div {
        width: 700px;
        margin: 0 auto;
        padding: 0;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .listwrap {
      width: 1100px;
      margin: 0 auto;
      justify-content: space-around;

      h2 {
        display: flex;
        font-weight: 700;
        font-size: 2rem;
        line-height: 1.35;
        text-align: left;
        color: #8e6610;
        margin: 60px 0;
      }

      > div {
        margin: 0;
      }
    }
  }
`;

const AllPrograms = () => {
  return (
    <Contents>
      <div className='carousel'>carousel container</div>
      <div className='listwrap'>
        <h2>
          그룹 테라피
          <br />
          프로그램
        </h2>
        <div>
          <ProgramFilter />
          <ProgramList />
        </div>
      </div>
    </Contents>
  );
};

export default AllPrograms;
