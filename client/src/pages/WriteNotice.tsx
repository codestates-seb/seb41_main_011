import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import TextEditor from '../components/UI/TextEditor';

const Content = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 16px;

  h3 {
    font-weight: 700;
    color: #333;
    border-bottom: 3px solid #b3d2b0;
    padding-bottom: 8px;
  }

  @media screen and (min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  select,
  input[type='text'] {
    border: 1px solid #ccc;
    ::placeholder {
      color: #bdbdbd;
    }
    &:focus {
      outline: none;
    }
  }

  select {
    flex-basis: 20%;
    padding: 8px 2px;
  }

  input[type='text'] {
    flex-grow: 10000;
    padding: 8px 16px;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }

  @media screen and (min-width: 768px) {
    select {
      flex-basis: 12%;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  border-top: 1px solid #ccc;
  padding-top: 8px;
`;

const Button = styled.button`
  padding: 8px 20px;
  border: 0;
  border-radius: 4px;
  cursor: pointer;

  &.style1 {
    background: #cae2c7;
    :hover,
    :active {
      background: #b3d2b0;
    }
  }

  &.style2 {
    background: #e8e8e8;
    :hover,
    :active {
      background: #ddd;
    }
  }
`;

const WriteNotice = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const clickCancelHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
    window.location.reload();
  };

  const onSubmitHandler = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && contents) {
      alert('submit!');
    } else {
      alert('제목과 내용을 모두 입력해주세요.');
    }
  };
  return (
    <Content>
      <h3>공지사항</h3>
      <Form onSubmit={onSubmitHandler}>
        <Title>
          <select>
            <option value=''>게시글 분류</option>
            <option value='notice'>공지</option>
          </select>
          <input
            type='text'
            placeholder='제목을 입력해주세요'
            value={title}
            onChange={onChangeTitle}
          />
        </Title>
        <TextEditor>
          <ReactQuill
            theme='snow'
            value={contents}
            onChange={setContents}
            placeholder='내용을 입력해주세요'
          />
        </TextEditor>
        <ButtonWrapper>
          <Button type='button' className='style2' onClick={clickCancelHandler}>
            취소
          </Button>
          <Button type='submit' className='style1'>
            등록
          </Button>
        </ButtonWrapper>
      </Form>
    </Content>
  );
};

export default WriteNotice;
