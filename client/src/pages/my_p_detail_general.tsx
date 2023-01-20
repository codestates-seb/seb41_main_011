import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/UI/Button';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';
import Footer from '../components/Footer';

const Contents = styled.main`
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 60px 20px 110px;
  color: #333;

  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }

  @media screen and (min-width: 1000px) {
    width: 1000px;
    margin: 0 auto;
  }

  @media screen and (min-width: 1200px) {
    padding: 90px 0 20px;
    min-height: calc(100vh - 70px);
  }
`;

const Detail = styled.div`
  background-color: #eceee2;
  padding: 1.43rem;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;

  h4 {
    font-weight: 500;
  }

  ul li {
    font-weight: 300;
    margin-top: 4px;

    strong {
      font-weight: 500;
      color: #72ab76;
      margin-right: 8px;
    }

    p {
      margin-top: 2px;
    }

    a {
      color: #8e6610;
      font-weight: 400;
      &:hover {
        text-decoration: underline;
      }
    }

    .tip {
      display: block;
      font-size: 0.85rem;
      margin-top: 4px;
      color: #666;
    }
  }

  @media screen and (min-width: 768px) {
    h4 {
      font-size: 1.15rem;
      margin-bottom: 8px;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: ${({ mgt }: { mgt: string }) => mgt};

  a {
    color: inherit;
  }
`;

const Title = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 1.83rem;
  text-align: left;
  width: 100%;
  line-height: 1.3;
  margin-bottom: 0.4rem;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  background: #e2d48a;
  color: #5b3e00;
  font-weight: 700;
`;

const MyProgramDetailG = () => {
  return (
    <div>
      <Header />
      <Contents>
        <Status>진행예정</Status>
        <Title>
          프로그램 제목 어쩌구 저쩌구 프로그램 제목 어쩌구 저쩌구 프로그램 제목
          어쩌구
        </Title>
        <Detail>
          <ul>
            <li>
              <strong>상담사</strong>햄토끼
            </li>
            <li>
              <strong>일정</strong>2023년 0월 00일 3:30PM ~ 4:30PM
            </li>
            <li>
              <strong>정원</strong>최대 10인
            </li>
          </ul>
        </Detail>

        <Detail>
          <h4>프로그램 참여 안내</h4>
          <ul>
            <li>
              <strong>그룹 상담 접속 링크</strong>
              <p>
                <a href='https://google.com' target='blank'>
                  https://google.com
                </a>
              </p>
            </li>
            <li>
              <strong>참여자 전달 사항</strong>
              <p>프로그램 시작 5분 전까지 상담실로 입장해주세요.</p>
            </li>
          </ul>
        </Detail>

        <Detail>
          <h4>예약 정보</h4>
          <ul>
            <li>
              <strong>예약일시</strong>2023년 1월 2일 3:21PM
            </li>
            <li>
              <strong>결제금액</strong>30,000원
            </li>
            <li>
              <strong>결제방법</strong>신용카드
            </li>
            <li>
              <strong>예약취소</strong>
              <Link to='#'>취소신청</Link>
              <span className='tip'>
                * 예약 취소는 일정 시작 48시간 전까지만 가능합니다.
              </span>
            </li>
          </ul>
        </Detail>
        <ButtonWrapper mgt='4px'>
          <Button width='100%' height='3em' fontsize='1rem'>
            <Link to='/myprogram'>목록보기</Link>
          </Button>
        </ButtonWrapper>
      </Contents>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default MyProgramDetailG;
