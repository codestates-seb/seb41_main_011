import styled from 'styled-components';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';
import Program from '../components/Program';
import { Link } from 'react-router-dom';

const ContentWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 40px;

  @media screen and (min-width: 768px) {
    padding-top: 64px;
  }
  @media screen and (min-width: 1200px) {
    padding-top: 70px;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  @media screen and (min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
  }
`;
const Logo = styled.img`
  width: 110px;
  margin: 12px auto;
  @media screen and (min-width: 768px) {
    width: 120px;
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
    <ContentWrapper>
      <Header />
      <Content>
        <Logo src='teacup.png' />
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
      </Content>
      <Tabbar />
    </ContentWrapper>
  );
};

export default TestResult;
