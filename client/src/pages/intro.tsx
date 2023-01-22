import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OuterWrapper = styled.div`
  min-height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 5vw;
  width: 100%;
  padding: 60px 20px;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: center;
    padding: 0;
    min-height: 100vh;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;

  @media screen and (min-width: 1200px) {
    width: 400px;
  }
`;

const MainMessage = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: center;
  width: 100%;
  @media screen and (min-width: 1200px) {
    text-align: left;
    width: 400px;
  }
`;

const SubMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  color: #333;

  strong {
    font-weight: 500;
  }

  @media screen and (min-width: 1200px) {
    width: 400px;
    text-align: left;
    margin-bottom: 12px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Button = styled.button`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 4px;
  border-radius: 10px;
  border: none;
  height: 3em;
  width: 100%;
  background-color: #c4dcbf;
  color: #333;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #70846c;
    color: white;
  }

  a {
    color: inherit;
    display: block;
  }

  @media screen and (min-width: 768px) {
    width: 400px;
    margin: 0 auto;
  }
  @media screen and (min-width: 1200px) {
    width: 320px;
    margin: 0;
  }
`;
const Logo = styled.img`
  width: 320px;
  height: 320px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileLogo = styled.img`
  width: 200px;
  @media screen and (min-width: 1200px) {
    width: 280px;
  }
  @media screen and (min-width: 1200px) {
    display: none;
  }
`;

const Intro = () => {
  return (
    <div>
      <OuterWrapper>
        <ContentWrapper>
          <MainMessage>안녕하세요! 반가워요</MainMessage>
          <SubMessage>
            시작하기 전 간단한 질문이 있어요.
            <br />
            <strong>그룹 테라피</strong>에 대해 친숙하신가요?😊
          </SubMessage>
          <MobileLogo src='green-tea.png' />
          <ButtonWrapper>
            <Button>
              <Link to='/about'>잘 몰라요. 조금 더 알려주실래요?</Link>
            </Button>
            <Button>
              <Link to='/'>이미 알고있어요</Link>
            </Button>
          </ButtonWrapper>
        </ContentWrapper>

        <Logo src='green-tea.png'></Logo>
      </OuterWrapper>
    </div>
  );
};

export default Intro;
