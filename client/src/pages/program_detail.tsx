import styled from 'styled-components';

import ProgramInfo from '../components/ProgramInfo';
import BtnBooking from '../components/BtnBooking';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tabbar from '../components/tabbar';

const Contents = styled.main`
  width: 100%;
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 40px 0 90px;

  @media screen and (min-width: 768px) {
    padding: 64px 0 0;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    width: 1080px;
    margin: 0 auto;
    gap: 24px;
    padding-top: 90px;
    min-height: calc(100vh - 70px);
  }
`;

const ProgramDetail = () => {
  return (
    <div>
      <Header />
      <Contents>
        <ProgramInfo />
        <BtnBooking />
      </Contents>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default ProgramDetail;
