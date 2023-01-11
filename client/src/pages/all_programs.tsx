import styled from 'styled-components';

import ProgramFilter from '../components/ProgramFilter';
import ProgramList from '../components/ProgramList';

const Contents = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  /* 헤더 영역 */
  h1 {
    font-weight: 700;
    font-size: 1.53rem;
    color: #999;
    height: 70px;
    line-height: 70px;
  }

  /* 캐러셀 */
  .carousel {
    background: #b3d2b0;
    height: 55vw;
    line-height: 55vw;
  }
`;

const AllPrograms = () => {
  return (
    <Contents>
      <h1>LOGO TEXT</h1>
      <div className='carousel'>carousel container</div>
      <ProgramFilter />
      <ProgramList />
    </Contents>
  );
};

export default AllPrograms;
