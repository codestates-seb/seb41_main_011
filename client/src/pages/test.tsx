import { ChangeEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';

export const ContentWrapper = styled.div`
  min-height: calc(100vh - 60px);
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
    width: 1200px;
    margin: 0 auto;
    min-height: calc(100vh - 70px);
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

const Tag = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #c4dcbf;
  border-radius: 5px;
  font-size: 14px;
  color: #112f1c;
  font-weight: 500;
  text-align: center;
  padding: 20px 0;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #b3d2b0;
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
  height: 3em;
  background-color: #f4e7a4;
  font-weight: 500;
  color: #535353;
  font-size: 1rem;
  &:hover {
    background-color: #f2e293;
    cursor: pointer;
  }
  @media screen and (min-width: 500px) {
    width: 500px;
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

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox']:checked:checked + label {
    background: #71ab75;
    color: #fff;
  }
`;

const Test = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    } else if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    } else {
      return;
    }
  };
  const checkHandler = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, event.target.checked);
  };

  const navigate = useNavigate();
  const toTestResult = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert(checkedList);
    navigate('/about/test-result');
  };
  const toHistoryBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Logo src='/teacup.png' />
        <MainMessage>
          오늘, 마오옹 님의 기분은
          <br />
          어떠신가요?
        </MainMessage>
        <SubMessage>
          마오옹 님에게 적합한 테라피 프로그램을 추천해 드릴게요😊 <br /> 여러
          개를 선택해 주셔도 괜찮아요.
        </SubMessage>
        <Form>
          <TagContainer>
            <input
              type='checkbox'
              id='program1'
              name='test'
              checked={checkedList.includes('program1')}
              onChange={(event) => checkHandler(event, 'program1')}
            />
            <Tag htmlFor='program1'>
              무력감이 들고 <br /> 우울해요
            </Tag>
            <input
              type='checkbox'
              id='program2'
              name='test'
              checked={checkedList.includes('program2')}
              onChange={(event) => checkHandler(event, 'program2')}
            />
            <Tag htmlFor='program2'>
              불안하고 <br />
              혼란스러워요
            </Tag>
            <input
              type='checkbox'
              id='program3'
              name='test'
              checked={checkedList.includes('program3')}
              onChange={(event) => checkHandler(event, 'program3')}
            />
            <Tag htmlFor='program3'>
              스트레스 <br />
              상태에요
            </Tag>
            <input
              type='checkbox'
              id='program4'
              name='test'
              checked={checkedList.includes('program4')}
              onChange={(event) => checkHandler(event, 'program4')}
            />
            <Tag htmlFor='program4'>
              술이나 약물을
              <br /> 끊기 힘들어요
            </Tag>
          </TagContainer>
          <ButtonWrapper>
            <Button type='submit' onClick={toTestResult}>
              적합한 프로그램 찾기
            </Button>
            <Button type='button' onClick={toHistoryBack}>
              건너뛸래요
            </Button>
          </ButtonWrapper>
        </Form>
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default Test;
