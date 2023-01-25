import styled from 'styled-components';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';
import Program from '../components/Program';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

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

const ProgramWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  gap: 15px;
  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

const TestResult = () => {
  return (
    <div>
      <Header />
      <ContentWrapper>
        <Logo src='/teacup.png' />
        <Top>
          <MainMessage>
            마오옹 님에게 추천하는 <br />
            프로그램 이에요
          </MainMessage>
          <ToAllPrograms>
            <Link to='/'>다른 프로그램도 볼래요</Link>
          </ToAllPrograms>
        </Top>
        <ProgramWrapper>
          <Program />
          <Program />
          <Program />
        </ProgramWrapper>
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default TestResult;
