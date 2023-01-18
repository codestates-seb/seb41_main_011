import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';

export const ContentWrapper = styled.div`
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
    gap: 24px;
  }
`;

const TagContainer = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  justify-content: center;
  gap: 15px;
  background-color: #eceee2;
  width: 100%;
  padding: 16px;
  border-radius: 10px;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px;

  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #b3d2b0;
  border-radius: 5px;
  font-size: 14px;
  color: #112f1c;
  font-weight: 500;
  text-align: center;
  padding: 20px 0;

  &:hover {
    background-color: #71ab75;
    color: #ffffff;
    cursor: pointer;
  }

  &:focus {
    background-color: #71ab75;
  }

  @media screen and (min-width: 768px) {
    font-size: 16px;
    font-weight: 400;
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
    width: 500px;
    font-size: 2rem;
  }
`;
const SubMessage = styled.div`
  width: 100%;
  text-align: left;
  color: #333333;
  @media screen and (min-width: 500px) {
    width: 500px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const Button = styled.button`
  box-shadow: #af9a7052 0px 2px 4px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 50px;
  background-color: #fbf4d3;
  font-weight: 500;
  color: #535353;
  font-size: 1rem;
  &:hover {
    background-color: #f4e7a4;
    cursor: pointer;
  }
  @media screen and (min-width: 500px) {
    width: 500px;
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

const Test = () => {
  const navigate = useNavigate();
  const toTestResult = () => {
    navigate('/test-result');
  };
  const toHistoryBack = () => {
    navigate(-1);
  };
  return (
    <ContentWrapper>
      <Header />
      <Content>
        <Logo src='teacup.png' />
        <MainMessage>
          오늘, 마오옹 님의 기분은
          <br />
          어떠신가요?
        </MainMessage>
        <SubMessage>
          마오옹 님에게 적합한 테라피 프로그램을 추천해 드릴게요😊 <br /> 여러
          개를 선택해 주셔도 괜찮아요.
        </SubMessage>
        <TagContainer>
          <Tag>
            무력감이 들고 <br /> 우울해요
          </Tag>
          <Tag>
            불안하고 <br />
            혼란스러워요
          </Tag>
          <Tag>
            스트레스 <br />
            상태에요
          </Tag>
          <Tag>
            술이나 약물을
            <br /> 끊기 힘들어요
          </Tag>
        </TagContainer>
        <ButtonWrapper>
          <Button onClick={toTestResult}>적합한 프로그램 찾기</Button>
          <Button onClick={toHistoryBack}>건너뛸래요</Button>
        </ButtonWrapper>
      </Content>
      <Tabbar />
    </ContentWrapper>
  );
};

export default Test;
