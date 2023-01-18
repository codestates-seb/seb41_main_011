import styled from 'styled-components';

import ProgramInfo from '../components/ProgramInfo';
import BtnBooking from '../components/BtnBooking';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tabbar from '../components/tabbar';

const Contents = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 40px;

  @media screen and (min-width: 768px) {
    padding-top: 64px;
  }
  @media screen and (min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
    gap: 24px;
    padding-top: 90px;
  }
`;

const ProgramDetail = () => {
  return (
    <Contents>
      <Header />
      <ProgramInfo />
      <BtnBooking />
      <Footer />
      <Tabbar />
    </Contents>
  );
};

export default ProgramDetail;
