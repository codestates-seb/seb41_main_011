import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaExclamationTriangle } from 'react-icons/fa';

import Button from '../components/UI/Button';
import AppointmentTable from '../components/AppointmentTable';
import Tabbar from '../components/tabbar';
import Footer from '../components/Footer';
import Header from '../components/Header';

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

    input[type='text'],
    textarea {
      width: 100%;
      border-radius: 12px;
      border: 1px solid #ddd;
      padding: 8px 16px;
      margin-top: 4px;
      resize: none;
      overflow: auto;
      ::placeholder {
        color: #828282;
        font-size: 0.85rem;
      }
      &:focus {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        outline: none;
      }
    }
    textarea {
      height: 80px;
      padding: 8px 16px;
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

    ul li {
      textarea {
        height: 100px;
      }
    }
  }
`;

const Warning = styled.div`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding-left: 12px;
  margin: 4px 0 8px;
  color: #b50000;
  font-size: 0.92rem;
  font-weight: 400;
  display: ${({ isShow }: { isShow: boolean }) => (isShow ? 'flex' : 'none')};

  @media screen and (min-width: 768px) {
    font-size: 0.82rem;
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

const MyProgramDetailT = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isShow, setIsShow] = useState(false);

  const linkRegex =
    /^((https)\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/; //eslint-disable-line

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setIsShow(false);
    }
    setInputValue(event.target.value);
  };

  const textareaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const editBtnClickHandler = () => {
    if (isEditable) {
      if (inputValue && !linkRegex.test(inputValue)) {
        setIsShow(true);
        return;
      }
      const isConfirm = window.confirm(
        `입력하신 내용이 프로그램 참여자에게 전달됩니다.\n정확하게 작성했는지 확인 해주세요.\n\n그룹 상담 접속 링크:\n${
          inputValue ? inputValue : '입력 내용 없음'
        }\n참여자 전달 사항:\n${
          textareaValue ? textareaValue : '입력 내용 없음'
        }`,
      );
      if (!isConfirm) return;
    }
    setIsEditable(!isEditable);
    setInputValue('');
    setTextareaValue('');
    setIsShow(false);
  };

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
              <strong>일정</strong>2023년 0월 00일 3:30PM ~ 4:30PM
            </li>
            <li>
              <strong>신청인원</strong> 4인 / 최대 10인
            </li>
          </ul>
        </Detail>

        <Detail>
          <h4>프로그램 참여 안내</h4>
          {!isEditable ? (
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
          ) : (
            <ul>
              <li>
                <strong>그룹 상담 접속 링크</strong>
                <p>
                  <input
                    type='text'
                    placeholder='https://us02web.zoom.us/...'
                    onChange={inputChangeHandler}
                    value={inputValue}
                  />
                </p>
                <Warning isShow={isShow}>
                  <FaExclamationTriangle />
                  <span>올바른 URL 주소가 아닙니다.</span>
                </Warning>
              </li>
              <li>
                <strong>참여자 전달 사항</strong>
                <p>
                  <textarea
                    placeholder='프로그램 참여자에게 전달할 사항이 있으면 작성해주세요.'
                    onChange={textareaChangeHandler}
                    value={textareaValue}
                  />
                </p>
              </li>
            </ul>
          )}

          <ButtonWrapper mgt='12px'>
            <Button
              width='100%'
              height='40px'
              fontsize='1rem'
              onClick={editBtnClickHandler}
            >
              {!isEditable ? '수정' : '확인'}
            </Button>
          </ButtonWrapper>
        </Detail>

        <Detail>
          <h4>예약 정보</h4>
          <AppointmentTable />
        </Detail>
        <ButtonWrapper mgt='4px'>
          <Button width='100%' height='3em' fontsize='1rem'>
            <Link to='/mypage'>목록보기</Link>
          </Button>
        </ButtonWrapper>
      </Contents>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default MyProgramDetailT;