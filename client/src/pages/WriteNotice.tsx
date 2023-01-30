import React, { useState, MouseEvent, ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Tabbar from '../components/tabbar';
import TextEditor from '../components/UI/TextEditor';
import api from '../RefreshToken';
const Content = styled.main`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 20px 110px;
  gap: 16px;

  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    width: 1000px;
    margin: 0 auto;
    padding: 90px 0 20px;
    min-height: calc(100vh - 70px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 3px solid #b3d2b0;
  padding-top: 8px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  select,
  input[type='text'] {
    margin: 0;
    border: 1px solid #ccc;
    color: #333;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    ::placeholder {
      color: #828282;
    }
    &:focus {
      outline: none;
    }
  }

  select {
    flex-basis: 20%;
    padding: 8px;
    background: url("data:image/svg+xml,%3Csvg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg' style=' fill: %23828282;%0A'%3E%3Cpath d='M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z'%3E%3C/path%3E%3C/svg%3E")
      #fff no-repeat right 8px center;
  }

  input[type='text'] {
    flex-grow: 10000;
    padding: 8px;
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
  color: #333;
  font-weight: 400;
  transition: all 0.2s;

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

const MainMessage = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: left;
  width: 100%;
  line-height: 1;
`;

const WriteNotice = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const clickCancelHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  const createPost = async () => {
    try {
      const reqBody = {
        title: title,
        content: contents,
      };
      await api.post('/api/notices/post', reqBody);
      alert('게시글이 등록되었습니다.');
      navigate('/community/notice');
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const onSubmitHandler = async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (category && title && contents) {
      createPost();
    } else {
      alert('게시글 분류와 제목과 내용을 모두 입력해주세요.');
    }
  };
  return (
    <div>
      <Header />
      <Content>
        <MainMessage>공지사항</MainMessage>
        <Form onSubmit={onSubmitHandler}>
          <Title>
            <select onChange={onChangeCategory} value={category}>
              <option value=''>게시글 분류</option>
              <option value='공지'>공지</option>
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
            <Button
              type='button'
              className='style2'
              onClick={clickCancelHandler}
            >
              취소
            </Button>
            <Button type='submit' className='style1'>
              등록
            </Button>
          </ButtonWrapper>
        </Form>
      </Content>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default WriteNotice;
