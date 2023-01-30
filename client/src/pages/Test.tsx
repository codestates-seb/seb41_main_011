import { ChangeEvent, MouseEvent, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';
import { testActions } from '../store/test';

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
  padding: 20px 10px;
  transition: all 0.2s;
  cursor: pointer;
  word-break: keep-all;

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
  const dispatch = useAppDispatch();

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

  const readTest = () => {
    const symptom = [0, 0, 0, 0];

    for (const i of checkedList) {
      if (i === '0' || i === '1') {
        symptom[0]++;
        if (symptom[0] === 2) {
          return '스트레스';
        }
      } else if (i === '2' || i === '3') {
        symptom[1]++;
        if (symptom[1] === 2) {
          return '불안';
        }
      } else if (i === '4' || i === '5') {
        symptom[2]++;
        if (symptom[2] === 2) {
          return '우울';
        }
      } else if (i === '6' || i === '7') {
        symptom[3]++;
        if (symptom[3] === 2) {
          return '중독';
        }
      }
    }

    switch (checkedList[0]) {
      case '0':
      case '1':
        return '스트레스';
      case '2':
      case '3':
        return '불안';
      case '4':
      case '5':
        return '우울';
      case '6':
      case '7':
        return '중독';
    }
    return '';
  };
  const navigate = useNavigate();
  const toTestResult = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (checkedList.length) {
      const searchKeyword = readTest();
      dispatch(testActions.result(searchKeyword));
      navigate('/about/test-result');
    } else {
      alert('선택한 항목이 없습니다.');
      return;
    }
  };
  const toHistoryBack = () => {
    navigate(-1);
  };

  const questions = [
    '자주 깨거나 푹 잘 수 없어요',
    '정서적으로 탈진한 느낌이예요',
    '안 좋은 일이 생길 것 같아요',
    '신경이 예민하고 안절부절해요',
    '일상생활에 만족하지 못해요',
    '모든 일에 의욕이 없어요',
    '○○으로 일상에 문제가 생겨요',
    '○○을 줄이고 싶지만 잘 안돼요',
  ];

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Logo src='/teacup.png' />
        <MainMessage>
          오늘, <br />
          당신의 기분은 어떠신가요?
        </MainMessage>
        <SubMessage>
          기분에 적합한 테라피 프로그램을 추천해 드릴게요😊 <br /> 여러 개를
          선택해 주셔도 괜찮아요.
        </SubMessage>
        <Form>
          <TagContainer>
            {questions.map((item, idx) => {
              return (
                <div key={idx}>
                  <input
                    type='checkbox'
                    id={`${idx}`}
                    name='test'
                    checked={checkedList.includes(`${idx}`)}
                    onChange={(event) => checkHandler(event, `${idx}`)}
                  />
                  <Tag htmlFor={`${idx}`}>{item}</Tag>
                </div>
              );
            })}
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
