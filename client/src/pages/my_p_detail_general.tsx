import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Label from '../components/UI/Label';
import Button from '../components/UI/Button';

const Contents = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  color: #333;

  @media screen and (min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
  }
`;

const Detail = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;

  h3 {
    font-size: 1.23rem;
    font-weight: 700;
    line-height: 1.35;
    word-break: keep-all;
    margin: 1rem 0;
  }

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
    h3 {
      margin: 0.75rem 0;
      font-size: 1.33rem;
    }
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

  @media screen and (min-width: 1200px) {
    width: 200px;
    margin: ${({ mgt }: { mgt: string }) => mgt} auto 0;
  }
`;

const MyProgramDetailG = () => {
  return (
    <Contents>
      <Detail>
        <Label>진행예정</Label>
        <h3>
          프로그램 제목 어쩌구 저쩌구 프로그램 제목 어쩌구 저쩌구 프로그램 제목
          어쩌구
        </h3>
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
        <Button width='100%' height='40px' fontsize='1rem'>
          <Link to='#'>목록보기</Link>
        </Button>
      </ButtonWrapper>
    </Contents>
  );
};

export default MyProgramDetailG;
