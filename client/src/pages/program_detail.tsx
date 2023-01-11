import styled from 'styled-components';

import ProgramInfo from '../components/ProgramInfo';
import BtnBooking from '../components/BtnBooking';

const Contents = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
    gap: 24px;
  }
`;

const ProgramDetail = () => {
  return (
    <Contents>
      <ProgramInfo />
      <BtnBooking />
    </Contents>
  );
};

export default ProgramDetail;
