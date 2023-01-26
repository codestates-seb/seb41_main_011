import React, { useState, MouseEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InputAdmin from '../../components/UI/Input';
import TextArea from '../../components/UI/Textarea';
import SelectBox from '../../components/UI/SelectBox';
import { FaRegCalendarCheck, FaTimes } from 'react-icons/fa';
import { modalCloseProps } from '../../pages/userManagement';

interface CreateProgram {
  id: string;
  startingtime: string;
  endtime: string;
  regularnumber: string;
  title: string;
  description: string;
  tag?: string;
  url: string;
}

export const ScreenWrapper = styled.div<{ modal: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #00000042;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  display: ${(props) => (!props.modal ? 'none' : null)};
  &.closed {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  background: #fff;
  position: relative;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 70vw;
  max-height: 75vh;
  overflow-y: auto;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  border: none;
  background: none;
  font-size: 2rem;
  line-height: 1;
  transition: all 0.2s;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;
const Title = styled.div`
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  strong,
  label {
    color: #4b4b4b;
    font-weight: 500;
    margin-right: 16px;
  }
  strong {
    font-size: 1rem;
  }
  .inputlabel {
    display: inline-block;
    width: 20%;
  }

  input[type='text'],
  input[type='number'] {
    width: 60%;
  }
  input[type='datetime-local'] {
    width: 45%;
  }

  .mb-8 {
    margin-bottom: 8px;
  }
  .pl-16 {
    padding-left: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  justify-content: center;

  button {
    width: 180px;
    height: 3em;
    font-weight: 500;
    font-size: 1rem;
    border-radius: 8px;
    border: 0;
    transition: all 0.2s;
    cursor: pointer;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background: #155dcf;
  :hover,
  :active {
    background: #003fa4;
  }
`;
const DeleteButton = styled.button`
  background: #af1905;
  :hover,
  :active {
    background: #901707;
  }
`;

const CreateProgramForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const EditPrograms = (props: modalCloseProps) => {
  const [id, setId] = useState<string>('');
  const [startingtime, setStartingtime] = useState<string>('');
  const [endtime, setEndtime] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [regularnumber, setRegularnumber] = useState<any>();
  const [modal, setModal] = useState<boolean>(true);

  const handleCloseButton = (event: MouseEvent<HTMLButtonElement>) => {
    setModal(!modal);
    props.close();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    setModal(!modal);
    props.close();
  };

  const [price, setPrice] = useState<any>(0);
  const handleTitleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setDescription(target.value);
  };
  const handleTagChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setTag(target.value);
  };
  const handleUrlChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUrl(target.value);
  };
  const handleTherapistChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setId(target.value);
  };
  const handleRegularnumberChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setRegularnumber(target.value);
  };
  const handleStartingtimeChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setStartingtime(target.value);
  };
  const handleEndtimeChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setEndtime(target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setPrice(target.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reqbody: CreateProgram = {
      id,
      startingtime,
      endtime,
      regularnumber,
      title,
      description,
      tag,
      url,
    };
    console.log(
      id,
      startingtime,
      endtime,
      regularnumber,
      title,
      description,
      tag,
      url,
    );
    axios
      .post(
        'https://jsonplaceholder.typicode.com/posts',
        JSON.stringify(reqbody),
      )
      .then((res) => console.log)
      .catch((err) => console.log);
  };
  return (
    <ScreenWrapper modal={modal} onClick={handleBackdropClick}>
      <ContentWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton type='button' onClick={handleCloseButton}>
          <FaTimes />
        </CloseButton>
        <Title>
          <FaRegCalendarCheck size={36} color='#999' />
          프로그램 정보 수정
        </Title>
        <CreateProgramForm onSubmit={handleSubmit}>
          <InputWrapper>
            <InputSection>
              <div>
                <label htmlFor='title' className='inputlabel'>
                  프로그램 제목
                </label>
                <InputAdmin
                  type='text'
                  id='title'
                  placeholder='프로그램 제목'
                  onChange={handleTitleChange}
                />
              </div>
              <SelectBox />
              <div>
                <label htmlFor='price' className='inputlabel'>
                  참여 비용
                </label>
                <InputAdmin
                  category='birth'
                  type='number'
                  id='price'
                  placeholder='숫자만 입력하세요'
                  onChange={handlePriceChange}
                ></InputAdmin>
              </div>
              <div>
                <label htmlFor='regularnumber' className='inputlabel'>
                  정원
                </label>
                <InputAdmin
                  type='number'
                  id='regularnumber'
                  placeholder='숫자만 입력하세요'
                />
              </div>
              <div>
                <label htmlFor='therapist' className='inputlabel'>
                  상담사
                </label>
                <InputAdmin
                  type='text'
                  id='therapist'
                  placeholder='상담사 ID값 입력'
                />
              </div>
              <div>
                <label htmlFor='url' className='inputlabel'>
                  대표 이미지
                </label>
                <InputAdmin
                  type='text'
                  id='url'
                  placeholder='이미지 url 경로를 입력해주세요'
                  onChange={handleUrlChange}
                />
              </div>
            </InputSection>
            <InputSection>
              <strong>프로그램 진행 시간</strong>
              <div className='pl-16'>
                <div className='mb-8'>
                  <label htmlFor='startingtime' className='inputlabel'>
                    시작일시
                  </label>
                  <InputAdmin
                    category='date'
                    type='datetime-local'
                    id='startingtime'
                    onChange={handleStartingtimeChange}
                  />
                </div>
                <div>
                  <label htmlFor='endtime' className='inputlabel'>
                    종료일시
                  </label>
                  <InputAdmin
                    type='datetime-local'
                    id='endtime'
                    onChange={handleEndtimeChange}
                  />
                </div>
              </div>
              <TextArea
                id='description'
                rows={5}
                child='프로그램 설명'
                onChange={handleDescriptionChange}
                placeholder='프로그램 설명을 입력해주세요'
              />
            </InputSection>
          </InputWrapper>
          <ButtonWrapper>
            <DeleteButton>삭제</DeleteButton>
            <SubmitButton>수정</SubmitButton>
          </ButtonWrapper>
        </CreateProgramForm>
      </ContentWrapper>
    </ScreenWrapper>
  );
};

export default EditPrograms;
