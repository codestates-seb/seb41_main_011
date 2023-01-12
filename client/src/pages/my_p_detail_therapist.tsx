import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Label from '../components/UI/Label';
import Button from '../components/UI/Button';
import AppointmentTable from '../components/AppointmentTable';

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
        color: #bdbdbd;
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

    ul li {
      textarea {
        height: 100px;
      }
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

const MyProgramDetailT = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const textareaChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextareaValue(event.target.value);
  };

  const editBtnClickHandler = () => {
    if (isEditable) {
      if (inputValue && inputValue.slice(0, 8) !== 'https://') {
        alert('정확한 링크를 입력해주세요.');
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
  };

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
        <Button width='100%' height='40px' fontsize='1rem'>
          <Link to='#'>목록보기</Link>
        </Button>
      </ButtonWrapper>
    </Contents>
  );
};

export default MyProgramDetailT;
