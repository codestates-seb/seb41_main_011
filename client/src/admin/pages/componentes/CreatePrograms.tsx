import React, { useState, MouseEvent, useEffect } from 'react';
import styled from 'styled-components';
import InputAdmin from '../../components/UI/Input';
import TextArea from '../../components/UI/Textarea';
import SelectBox from '../../components/UI/SelectBox';
import { FaRegCalendarCheck, FaTimes } from 'react-icons/fa';
import { modalCloseProps, createProgramProps } from '../../types';
import api from '../../../RefreshToken';

export const ScreenWrapper = styled.div<{ modal: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
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
  max-width: 1200px;
  max-height: 75vh;
  overflow-y: auto;
  @media screen and (min-width: 1000px) {
    min-width: 1000px;
  }
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

const SubmitButton = styled.button`
  width: 300px;
  height: 3em;
  margin: 0 auto;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  border: 0;
  transition: all 0.2s;
  background: #155dcf;
  color: #fff;
  cursor: pointer;
  :hover,
  :active {
    background: #003fa4;
  }
`;

const CreateProgramForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const CreatePrograms = (props: modalCloseProps) => {
  const [modal, setModal] = useState<boolean>(true);

  const handleCloseButton = (event: MouseEvent<HTMLButtonElement>) => {
    setModal(!modal);
    props.close();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    setModal(!modal);
    props.close();
  };

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [userMax, setUserMax] = useState<any>();
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [symptomTypes, setSymptomTypes] = useState<string[]>([]);
  const [counselorId, setCounselorId] = useState<any>();
  const [cost, setCost] = useState<any>();

  const handleTitleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setContent(target.value);
  };
  const handleUrlChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setImage(target.value);
  };
  const handleRegularnumberChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUserMax(target.value);
  };
  const handleStartingtimeChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setDateStart(target.value);
  };
  const handleEndtimeChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setDateEnd(target.value);
  };
  const handleTherapistChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setCounselorId(target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setCost(target.value);
  };

  const postNewProgram = async () => {
    try {
      const reqBody: createProgramProps = {
        title,
        content,
        image,
        userMax: Number(userMax),
        dateStart,
        dateEnd,
        symptomTypes,
        cost: Number(cost),
        counselorId: Number(counselorId),
      };

      await api.post('/api/programs/post', reqBody);
      alert('프로그램이 등록되었습니다.');
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postNewProgram();
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
          프로그램 등록
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
              <SelectBox setValue={(value) => setSymptomTypes(value)} />
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
                  onChange={handleRegularnumberChange}
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
                  onChange={handleTherapistChange}
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
          <SubmitButton>등록</SubmitButton>
        </CreateProgramForm>
      </ContentWrapper>
    </ScreenWrapper>
  );
};

export default CreatePrograms;
