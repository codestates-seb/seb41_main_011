import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 110px;
  gap: 16px;

  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1000px) {
    width: 1000px;
    margin: 0 auto;
    padding: 90px 0 20px;
    gap: 24px;
  }
  @media screen and (min-width: 1200px) {
    padding-top: 90px 0 20px;
    min-height: calc(100vh - 70px);
  }
`;

const MainMessage = styled.div`
  width: 100%;
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: left;
`;

const SubMessage = styled.div`
  font-weight: 300;
  color: #333;
  background-color: #eceee2;
  text-align: left;
  padding: 1.43rem;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  img {
    max-width: 100%;
  }
  br {
    display: none;
  }

  @media screen and (min-width: 1200px) {
    br {
      display: block;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media screen and (min-width: 1200px) {
    gap: 1.3rem;
  }
`;

const Button = styled.button`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  border: none;
  width: 100%;
  padding: 10px 0;
  background-color: #c4dcbf;
  color: #333;
  font-size: 1rem;
  transition: all 0.2s;
  &:hover {
    background-color: #70846c;
    color: white;
  }
  a {
    color: inherit;
    display: block;
  }
`;

const About = () => {
  return (
    <div>
      <Header />
      <ContentWrapper>
        <MainMessage>그룹테라피란?</MainMessage>
        <SubMessage>
          <img src='/about.jpg' alt='모닥불에 둥글게 모인 사람들' />
          <p>
            그룹 테라피는 비슷한 주제에 관심이 있는 그룹원들이 모여 이야기를
            나누며 자신과 타인에 대한 이해를 통해 서로의 성장을 돕는 상담입니다.
            <br />
            테라피를 경험하면서 그룹원들이 서로 피드백을 해주고, 그룹 안에서
            수용과 격려, 지지를 경험하며 성장할 수 있는 심리적 자양분을 얻을 수
            있습니다.
          </p>
          <p>
            우리 티타임에서는 비대면 그룹 테라피를 화상 회의 프로그램을 통한
            원격 시스템으로 제공하고 있습니다. 시간, 장소 등의 물리적인 제약이
            많은 기존의 그룹 테라피 프로그램과 달리 쉽게 그룹 상담을 경험할 수
            있고 임상 경험이 많고 좋은 상담사 선생님들과 함께 최고의 프로그램을
            경험해 볼 수 있습니다. 저렴한 비용과 보다 쉬운 접근으로 그룹 테라피
            프로그램을 만나보세요.
          </p>
          <p>
            전체 프로그램 목록에서 원하는 상담을 찾을 수도 있습니다. 오늘의
            기분은 어떤지, 어떤 프로그램이 적합한 지 테스트를 통해 추천 받을
            수도 있습니다. 어떤 프로그램을 해볼 지 고르기 어려울 때는 테스트를
            이용해보세요.
          </p>
          <p>감사합니다.</p>
        </SubMessage>
        <ButtonWrapper>
          <Button>
            <Link to='/'>그렇군요! 전체 프로그램을 보여주세요.</Link>
          </Button>
          <Button>
            <Link to='/about/test'>
              저에게 맞는 프로그램을 추천받고 싶어요.
            </Link>
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default About;
